/**
 * Converts an ISO timestamp string to relative time format
 * @param timestamp - ISO timestamp string (e.g., "2025-08-02T06:03:22.001Z")
 * @returns Relative time string (e.g., "1 min ago", "2 hours ago", "3 days ago")
 */
export const getRelativeTime = (timestamp: string | Date): string => {
  try {
    const date =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const now = new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Handle future dates
    if (diffInMs < 0) {
      return "Just now";
    }

    // Less than 1 minute
    if (diffInSeconds < 60) {
      return "Just now";
    }

    // Less than 1 hour
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"} ago`;
    }

    // Less than 1 day
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    // Less than 1 week
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    // Less than 1 month
    if (diffInWeeks < 4) {
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
    }

    // Less than 1 year
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    }

    // 1 year or more
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
  } catch (error) {
    console.error("Error parsing timestamp:", error);
    return "Invalid date";
  }
};

/**
 * Formats timestamp for chat messages with more detailed time info
 * @param timestamp - ISO timestamp string or Date object
 * @returns Formatted time string
 */
export const formatChatTime = (timestamp: string | Date): string => {
  try {
    const date =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const now = new Date();

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    // Same day - show time only
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Yesterday
    if (diffInDays === 1) {
      return `Yesterday ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    }

    // Within a week - show day and time
    if (diffInDays < 7) {
      return date.toLocaleDateString([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Older than a week - show date
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: diffInDays > 365 ? "numeric" : undefined,
    });
  } catch (error) {
    console.error("Error formatting chat time:", error);
    return "Invalid date";
  }
};

/**
 * Simple format for displaying exact date and time
 * @param timestamp - ISO timestamp string or Date object
 * @returns Formatted date string
 */
export const formatDateTime = (timestamp: string | Date): string => {
  try {
    const date =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "Invalid date";
  }
};
