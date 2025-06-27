"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
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
  const [token, setToken] = useState<string | null>(null);
<<<<<<< HEAD:component/hook/use-req.tsx
=======
  // const token = localStorage.getItem("token");

    useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
>>>>>>> f9bf94f577133e9f41dfa935e325d6db85951c71:components-custom/hook/use-req.tsx

  // Get token on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  async function makeRequest(
    data?: any,
    params?: Record<string, any>,
    pathParam?: string
  ) {
    setLoading(true);

    // Get the latest token from localStorage at request time
    const currentToken = typeof window !== "undefined" ? localStorage.getItem("token") : token;

    const queryParams = new URLSearchParams(params).toString();
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
          ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
          ...headers,
        },
        body:
          method === "POST" ||
          method === "PUT" ||
          method === "DELETE" ||
          method === "PATCH"
            ? JSON.stringify(data)
            : undefined,
      });

      const json = await response.json();

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
      return [{}, 500];
    }
  }

  return { loading, makeRequest, response, statusCode };
}