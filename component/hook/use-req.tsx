"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { showToast } from "../toast";

const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://backend-app.jodexservices.com/api/v1";

export default function useRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  headers?: Record<string, any>
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [statusCode, setStatusCode] = useState(0);
  const token = localStorage.getItem("token");

  async function makeRequest(options?: {
    data?: any;
    params?: Record<string, any>;
    pathParam?: string;
  }) {
    setLoading(true);

    const { data, params, pathParam } = options || {};

    const queryParams = params ? new URLSearchParams(params).toString() : "";
    const urlWithParams =
      pathParam && queryParams
        ? `${baseURL}${endpoint}/${pathParam}?${queryParams}`
        : pathParam
        ? `${baseURL}${endpoint}/${pathParam}`
        : queryParams
        ? `${baseURL}${endpoint}?${queryParams}`
        : `${baseURL}${endpoint}`;

    try {
      const response = await fetch(urlWithParams, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        // Send the data directly without wrapping it in another object
        body:
          method === "POST" ||
          method === "PUT" ||
          method === "DELETE" ||
          method === "PATCH"
            ? JSON.stringify(data)
            : undefined,
        // Add mode: 'cors' to explicitly enable CORS
        mode: "cors",
        // credentials: 'include',
      });

      let json = null;
      if (
        response.status !== 204 &&
        response.headers.get("content-type")?.includes("application/json")
      ) {
        json = await response.json();
      }

      setResponse(json);
      setStatusCode(response.status);

      // Only show toast for non-GET methods or specific status codes
      if (method === "GET" && response.status === 500) {
        showToast(
          json.message || "An error occurred, please try again",
          false,
          {
            position: "top-right",
          }
        );
      }

      setLoading(false);

      return [json, response.status];
    } catch (error: any) {
      setLoading(false);
      console.error("Request failed:", error);

      // Only show toast for non-GET methods
      if (method !== "GET") {
        const errorMessage =
          error?.message === "Failed to fetch"
            ? "Network error, please check your connection."
            : "An error occurred, please try again";
        showToast(errorMessage, false, {
          position: "top-right",
        });
      }

      // Return default error response
      return [{ error: error.message }, 500];
    }
  }

  return { loading, makeRequest, response, statusCode };
}
