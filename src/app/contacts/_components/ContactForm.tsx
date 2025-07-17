"use client";

import { submitContactForm } from "../_actions/contact";
import { useActionState, useState } from "react";
import { z } from "zod/v4";
import {
  ContactErrorsType,
  ContactErrorType,
  ContactSchema,
} from "../_validations/contact";

const ContactForm = () => {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    errors: {},
  });

  const [clientErrors, setClientErrors] = useState({ name: "", email: "" });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      if (name === "name") {
        ContactSchema.pick({ name: true }).parse({ name: value });
      } else if (name === "email") {
        ContactSchema.pick({ email: true }).parse({ email: value });
      }
      setClientErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // https://github.com/colinhacks/zod/issues/4794#issuecomment-3026500503`
        const err = z.treeifyError(error as ContactErrorType)
          .properties as ContactErrorsType;

        const msg =
          name === "name" || name === "email"
            ? err[name]?.errors?.[0] ?? ""
            : "";

        setClientErrors((prev) => ({
          ...prev,
          [name]: msg,
        }));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h2>
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
            onBlur={handleBlur}
          />
          {/* サーバーサイドバリデーション */}
          {!!state.errors.name?.length && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.name.join(",")}
            </p>
          )}
          {/* クライアントサイドバリデーション */}
          {clientErrors.name && (
            <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="your.email@example.com"
            onBlur={handleBlur}
          />
          {!!state.errors.email?.length && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.email.join(",")}
            </p>
          )}
          {clientErrors.email && (
            <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
