package logger

import (
	"io"
	"log"
	"os"
)

// Logger is the shared application logger used across the template.
var Logger = log.New(os.Stdout, "", log.LstdFlags)

// Init configures the shared logger output.
func Init() {
	Logger.SetFlags(log.LstdFlags | log.Lmsgprefix)
	Logger.SetPrefix("[app] ")

	writer := io.Writer(os.Stdout)
	if os.Getenv("APP_LOG_STDERR") == "true" {
		writer = os.Stderr
	}

	Logger.SetOutput(writer)
}
