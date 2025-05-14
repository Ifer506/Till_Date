// File: src/utils/toast.js
import { toast as sonnerToast } from 'sonner';

export const TOAST_DURATION = 3000; // centralized duration

export const toast = {
  success: (msg, options = {}) =>
    sonnerToast.success(msg, { duration: TOAST_DURATION, ...options }),

  error: (msg, options = {}) =>
    sonnerToast.error(msg, { duration: TOAST_DURATION, ...options }),

  warning: (msg, options = {}) =>
    sonnerToast.warning(msg, { duration: TOAST_DURATION, ...options }),

  info: (msg, options = {}) =>
    sonnerToast.info(msg, { duration: TOAST_DURATION, ...options }),
};

// ESLint rule in .eslintrc.js
// Prevent direct toast import from 'sonner'
/*
module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'sonner',
            importNames: ['toast'],
            message: "Please use '@/utils/toast' instead of directly importing from 'sonner'",
          },
        ],
      },
    ],
  },
};
*/

// VS Code Snippet (e.g. in toast.code-snippets or global snippets)
/*
"Custom Toast Success": {
  "prefix": "toastSuccess",
  "body": [
    "toast.success(\"$1\");"
  ],
  "description": "Custom toast.success using centralized toast utility"
},
"Custom Toast Error": {
  "prefix": "toastError",
  "body": [
    "toast.error(\"$1\");"
  ],
  "description": "Custom toast.error using centralized toast utility"
}
*/
