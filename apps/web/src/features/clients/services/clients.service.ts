import type { ClientLifecycleData } from "../types/clients.types";
import { dummyClientLifecycleData } from "../utils/clients-dummy-data";

export async function fetchClientLifecycleData(): Promise<ClientLifecycleData> {
  // Simulate network latency if needed, returning realistic client data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyClientLifecycleData);
    }, 100);
  });
}
