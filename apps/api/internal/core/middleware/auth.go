package middleware

import (
	"context"
	"strings"

	"github.com/gilabs/indosupplier/api/internal/core/errors"
	"github.com/gilabs/indosupplier/api/internal/core/infrastructure/jwt"
	"github.com/gin-gonic/gin"
)

const accessTokenCookieName = "indosupplier_access_token"

func collectCookieValues(c *gin.Context, name string) []string {
	values := make([]string, 0)
	seen := map[string]struct{}{}

	for _, cookie := range c.Request.Cookies() {
		if cookie.Name != name || cookie.Value == "" {
			continue
		}
		if _, ok := seen[cookie.Value]; ok {
			continue
		}
		seen[cookie.Value] = struct{}{}
		values = append(values, cookie.Value)
	}

	return values
}

func isNewerTokenClaims(candidate *jwt.Claims, current *jwt.Claims) bool {
	if current == nil {
		return true
	}

	candidateIat := int64(0)
	currentIat := int64(0)
	if candidate.IssuedAt != nil {
		candidateIat = candidate.IssuedAt.Time.Unix()
	}
	if current.IssuedAt != nil {
		currentIat = current.IssuedAt.Time.Unix()
	}
	if candidateIat != currentIat {
		return candidateIat > currentIat
	}

	candidateExp := int64(0)
	currentExp := int64(0)
	if candidate.ExpiresAt != nil {
		candidateExp = candidate.ExpiresAt.Time.Unix()
	}
	if current.ExpiresAt != nil {
		currentExp = current.ExpiresAt.Time.Unix()
	}

	return candidateExp > currentExp
}

func setAuthenticatedContext(c *gin.Context, claims *jwt.Claims) {
	role := claims.Role
	if role == "" {
		role = "user"
	}

	c.Set("user_id", claims.UserID)
	c.Set("user_email", claims.Email)
	c.Set("user_role", role)

	permMap := map[string]bool{}
	permScopeMap := map[string]string{}
	c.Set("user_permissions", permMap)
	c.Set("user_permissions_scope", permScopeMap)

	if claims.TenantID != "" {
		c.Set("tenant_id", claims.TenantID)
	}
	if role == "system_admin" {
		c.Set("is_system_admin", true)
	}

	reqCtx := c.Request.Context()
	reqCtx = context.WithValue(reqCtx, "user_id", claims.UserID)
	reqCtx = context.WithValue(reqCtx, "user_email", claims.Email)
	reqCtx = context.WithValue(reqCtx, "user_role", role)
	reqCtx = context.WithValue(reqCtx, "user_permissions", permMap)
	reqCtx = context.WithValue(reqCtx, "user_permissions_scope", permScopeMap)
	reqCtx = context.WithValue(reqCtx, "client_ip", c.ClientIP())
	reqCtx = context.WithValue(reqCtx, "user_agent", c.Request.UserAgent())

	if claims.TenantID != "" {
		reqCtx = context.WithValue(reqCtx, "tenant_id", claims.TenantID)
	}
	if role == "system_admin" {
		reqCtx = context.WithValue(reqCtx, "is_system_admin", true)
	}

	debugLog(
		"[AuthMiddleware] method=%s path=%s user_id=%s role=%s tenant_id=%s",
		c.Request.Method,
		c.Request.URL.Path,
		claims.UserID,
		role,
		claims.TenantID,
	)

	c.Request = c.Request.WithContext(reqCtx)
}

func extractBearerToken(c *gin.Context) string {
	authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
	if authHeader == "" {
		return ""
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return ""
	}

	return strings.TrimSpace(parts[1])
}

func validateCookieToken(jwtManager *jwt.JWTManager, c *gin.Context) (*jwt.Claims, bool) {
	candidates := collectCookieValues(c, accessTokenCookieName)
	if len(candidates) == 0 {
		return nil, false
	}

	var claims *jwt.Claims
	sawExpired := false
	for _, candidate := range candidates {
		candidateClaims, validateErr := jwtManager.ValidateToken(candidate)
		if validateErr != nil {
			if validateErr == jwt.ErrExpiredToken {
				sawExpired = true
			}
			continue
		}

		if isNewerTokenClaims(candidateClaims, claims) {
			claims = candidateClaims
		}
	}

	if claims != nil {
		return claims, true
	}

	if sawExpired {
		errors.ErrorResponse(c, "TOKEN_EXPIRED", nil, nil)
	} else {
		errors.ErrorResponse(c, "TOKEN_INVALID", nil, nil)
	}
	c.Abort()
	return nil, true
}

// AuthMiddleware validates JWT token and stores user context for the template baseline.
func AuthMiddleware(jwtManager *jwt.JWTManager) gin.HandlerFunc {
	return func(c *gin.Context) {
		if isCRMLeadUpsertWebhookRequest(c.Request.Method, c.Request.URL.Path) {
			setAuthenticatedContext(c, &jwt.Claims{
				UserID: "00000000-0000-0000-0000-000000000000",
				Email:  "webhook@system.local",
				Role:   "system",
			})
			c.Next()
			return
		}

		tokenString := extractBearerToken(c)
		var claims *jwt.Claims

		if tokenString != "" {
			validatedClaims, err := jwtManager.ValidateToken(tokenString)
			if err != nil {
				if err == jwt.ErrExpiredToken {
					errors.ErrorResponse(c, "TOKEN_EXPIRED", nil, nil)
				} else {
					errors.ErrorResponse(c, "TOKEN_INVALID", nil, nil)
				}
				c.Abort()
				return
			}
			claims = validatedClaims
		} else {
			var ok bool
			claims, ok = validateCookieToken(jwtManager, c)
			if !ok {
				errors.UnauthorizedResponse(c, "token missing")
				c.Abort()
				return
			}
			if c.IsAborted() {
				return
			}
		}

		if claims == nil || claims.UserID == "" || claims.Email == "" {
			errors.ErrorResponse(c, "TOKEN_INVALID", nil, nil)
			c.Abort()
			return
		}

		setAuthenticatedContext(c, claims)
		c.Next()
	}
}
