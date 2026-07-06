import { nanoid } from "nanoid";
import { DEFAULT_THEME } from "./types";
import type { Form, Step } from "./types";

function step(data: Partial<Step> & { type: Step["type"] }): Step {
  return { id: nanoid(), title: "", description: "", required: false, ...data } as Step;
}

export function createSeedForms(): Form[] {
  const now = Date.now();

  const forms: Form[] = [
    {
      id: nanoid(),
      title: "Customer Feedback",
      description: "Help us improve your experience by sharing your thoughts.",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 10,
      updatedAt: now - 86400000 * 2,
      responseCount: 24,
      steps: [
        step({ type: "info", title: "We Value Your Opinion", description: "This quick survey will take less than 2 minutes. Your responses are anonymous." }),
        step({ type: "rating", title: "Overall Satisfaction", description: "How would you rate your experience?", required: true, maxRating: 5 }),
        step({ type: "yesno", title: "Would You Recommend Us?", description: "Would you recommend our service to friends or colleagues?", required: true, yesLabel: "Absolutely", noLabel: "Not Really" }),
        step({ type: "textarea", title: "What Can We Improve?", description: "Share any suggestions or feedback you have.", placeholder: "Tell us what you think...", rows: 4 }),
        step({ type: "email", title: "Follow-up Email", description: "Optional: leave your email if you'd like us to follow up.", placeholder: "email@example.com" }),
      ],
    },
    {
      id: nanoid(),
      title: "Job Application",
      description: "Apply for a position at our company.",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 7,
      updatedAt: now - 86400000 * 1,
      responseCount: 18,
      steps: [
        step({ type: "text", title: "Full Name", description: "Enter your first and last name.", required: true, placeholder: "John Doe" }),
        step({ type: "email", title: "Email Address", description: "We'll send you a confirmation.", required: true, placeholder: "john@company.com" }),
        step({ type: "phone", title: "Phone Number", description: "Best number to reach you.", required: true, placeholder: "+1 (555) 000-0000" }),
        step({ type: "select", title: "Position", description: "Which role are you applying for?", required: true, options: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Product Manager", "Other"], multiple: false }),
        step({ type: "textarea", title: "Cover Letter", description: "Tell us why you're a great fit.", placeholder: "Write your cover letter here...", rows: 6, required: true }),
      ],
    },
    {
      id: nanoid(),
      title: "Event Registration",
      description: "Register for our upcoming annual conference.",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 14,
      updatedAt: now - 86400000 * 3,
      responseCount: 156,
      steps: [
        step({ type: "text", title: "Full Name", description: "Name as it appears on your ID.", required: true, placeholder: "Jane Smith" }),
        step({ type: "email", title: "Email Address", description: "Your registration confirmation will be sent here.", required: true, placeholder: "jane@example.com" }),
        step({ type: "number", title: "Age", description: "You must be 18 or older to attend.", required: true, placeholder: "25", min: 18, max: 120 }),
        step({ type: "select", title: "Ticket Type", description: "Choose your pass.", required: true, options: ["General Admission - $199", "VIP - $499", "Student - $99", "Online Access - $49"], multiple: false }),
        step({ type: "date", title: "Preferred Workshop Day", description: "Select which day you'd like to attend the workshop.", required: false }),
      ],
    },
    {
      id: nanoid(),
      title: "Product Order",
      description: "Customize and place your order.",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 5,
      updatedAt: now - 86400000 * 1,
      responseCount: 42,
      steps: [
        step({ type: "select", title: "Product", description: "Select the product you'd like to order.", required: true, options: ["Standard Widget", "Premium Widget", "Widget Pro", "Widget Bundle"], multiple: false }),
        step({ type: "multiselect", title: "Add-ons", description: "Choose any optional extras.", required: false, options: ["Extended Warranty", "Gift Wrapping", "Express Shipping", "Engraving"], multiple: true }),
        step({ type: "number", title: "Quantity", description: "How many units?", required: true, placeholder: "1", min: 1, max: 99 }),
        step({ type: "text", title: "Special Instructions", description: "Any specific requests for your order.", placeholder: "Leave a note...", maxLength: 500 }),
      ],
    },
    {
      id: nanoid(),
      title: "Quick Quiz",
      description: "Test your knowledge with this fun quiz!",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 3,
      updatedAt: now,
      responseCount: 89,
      steps: [
        step({ type: "info", title: "Pop Culture Quiz", description: "5 questions to test your knowledge. Good luck!" }),
        step({ type: "multiselect", title: "Which of these are programming languages?", required: true, options: ["Python", "Banana", "TypeScript", "Coffee"], multiple: true }),
        step({ type: "yesno", title: "Is the Earth round?", required: true, yesLabel: "Yes", noLabel: "No" }),
        step({ type: "text", title: "What does API stand for?", required: true, placeholder: "Your answer..." }),
        step({ type: "rating", title: "How fun was this quiz?", description: "Rate your experience!", required: true, maxRating: 5 }),
      ],
    },
    {
      id: nanoid(),
      title: "Contact Us",
      description: "Get in touch with our team.",
      theme: { ...DEFAULT_THEME },
      createdAt: now - 86400000 * 30,
      updatedAt: now - 86400000 * 5,
      responseCount: 312,
      steps: [
        step({ type: "info", title: "We're Here to Help", description: "Fill out the form below and we'll get back to you within 24 hours." }),
        step({ type: "text", title: "Your Name", description: "How should we address you?", required: true, placeholder: "Alex Johnson" }),
        step({ type: "email", title: "Email Address", description: "So we can reply to you.", required: true, placeholder: "alex@example.com" }),
        step({ type: "phone", title: "Phone Number", description: "Optional if you prefer a call back.", placeholder: "+1 (555) 000-0000" }),
        step({ type: "select", title: "Subject", description: "What is your inquiry about?", required: true, options: ["General Inquiry", "Technical Support", "Billing", "Partnership", "Other"], multiple: false }),
        step({ type: "textarea", title: "Message", description: "Describe your issue or question in detail.", placeholder: "Write your message here...", rows: 5, required: true }),
      ],
    },
  ];

  return forms;
}
