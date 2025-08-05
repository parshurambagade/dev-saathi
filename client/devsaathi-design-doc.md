# 🎨 DevSaathi Design System (Design Doc)

A beautifully consistent, modern, and user-friendly UI/UX system for the "Dev Tinder" app – **DevSaathi**.

---

## 🌈 Color Palette

| Name           | Color Code | Usage |
|----------------|------------|-------|
| Primary        | #6366F1    | Buttons, Highlights, CTAs |
| Secondary      | #A5B4FC    | Secondary buttons, hover states |
| Accent         | #F59E0B    | Toasts, alerts, badges |
| Background     | #0F172A    | App background |
| Card BG        | #1E293B    | Card backgrounds |
| Surface        | #334155    | Inputs, Chat bubbles, containers |
| Text Primary   | #F8FAFC    | Headings, main text |
| Text Secondary | #CBD5E1    | Labels, descriptions |
| Border Color   | #475569    | Borders |
| Error Red      | #EF4444    | Error messages |
| Success Green  | #10B981    | Success messages |
| Toast Info     | #3B82F6    | Toast info bg |

---

## 🧱 Layout & Spacing

| Property  | Value     | Notes |
|-----------|-----------|-------|
| Padding   | `p-4`     | Base padding |
| Margin    | `m-4`     | Base margin |
| Gap       | `gap-4`   | Flex/grid gap |
| Border    | `rounded-2xl` | Consistent rounded corners |
| Shadow    | `shadow-xl` | Cards, Modals, Elevated areas |

Use `flex`, `grid`, `min-h-screen`, `max-w-4xl`, `mx-auto` for responsive layout.

---

## 📦 Components

### ✅ Buttons

| Type     | Style |
|----------|-------|
| Primary  | `bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700` |
| Secondary| `bg-secondary text-white px-6 py-2 rounded-lg hover:bg-indigo-500` |
| Outline  | `border border-primary text-primary px-6 py-2 rounded-lg` |
| Disabled | `opacity-50 cursor-not-allowed` |

---

### 👤 Profile Picture

- Shape: `rounded-full`
- Size: `w-20 h-20` (small), `w-32 h-32` (profile page)
- Border: `ring-4 ring-primary` (active users)
- Placeholder: Avatar with initials

---

### 📝 Forms (Login, Register, Edit Profile)

- Input Field: `bg-surface text-white px-4 py-2 rounded-lg border border-borderColor focus:outline-none focus:ring-2 focus:ring-primary`
- Label: `text-secondary text-sm font-medium mb-1`
- Error Text: `text-error text-sm mt-1`
- Spacing: `mb-6` between fields

---

### 🧑‍💻 Profile Card

- Background: `bg-card`
- Padding: `p-4`
- Border Radius: `rounded-2xl`
- Shadow: `shadow-xl`
- Layout: `flex flex-col items-center text-center`
- Includes:
  - Profile pic
  - Name, bio
  - Skills tags (`bg-surface text-sm px-3 py-1 rounded-full`)
  - Buttons: Accept / Ignore

---

### 📩 Request Card

- Similar to Profile Card
- Includes message snippet or intent text
- Buttons: Accept / Decline

---

### 🤝 Connection Card

- Horizontal layout: `flex items-center justify-between`
- Mini profile image, name
- Button: "Chat"

---

### 💬 Chat Bubble

| Type | Style |
|------|-------|
| Sender | `bg-primary text-white px-4 py-2 rounded-lg rounded-br-none` |
| Receiver | `bg-surface text-white px-4 py-2 rounded-lg rounded-bl-none` |
| Timestamp | `text-xs text-secondary mt-1` |

---

### 🧠 Toasts

| Type | Style |
|------|-------|
| Success | `bg-success text-white px-4 py-2 rounded-md` |
| Error   | `bg-error text-white px-4 py-2 rounded-md` |
| Info    | `bg-toast-info text-white px-4 py-2 rounded-md` |

Toasts should auto-dismiss in 3 seconds and be shown at top-center of the screen.

---

## 📄 Pages Breakdown

### 1. Login & Register Page
- Centered card: `max-w-md mx-auto mt-20 bg-card p-6 rounded-xl shadow-xl`
- Title: `text-2xl font-bold text-white mb-6`
- Form: see form styles
- CTA Button: Full width

### 2. Feed (Home)
- Grid layout: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Each item: Profile Card

### 3. Profile (Edit & View)
- Centered layout, large avatar, stats
- Edit: same form styling
- View: card layout with extra info

### 4. Requests Page
- Vertical stack of Request Cards

### 5. Connections Page
- Vertical list of Connection Cards

### 6. Chats (List)
- List of recent chats with name, last message, time

### 7. Chat (Individual)
- Header: user info + back
- Chat area: scrollable, reversed
- Input box: sticky bottom input with send button

### 8. Premium Page
- Promo section with gradient background
- Premium features list with icons
- Buy button styled as glowing (`animate-pulse bg-accent text-black`)

---

## 🔄 Transitions & Animations

- Button hover: `transition duration-200 ease-in-out`
- Modal open/close: fade + scale (`transition-all duration-300`)
- Toast: slide-in from top
- Card hover: subtle lift `hover:shadow-2xl transform hover:-translate-y-1`

---

## 📱 Responsiveness

- Use `max-w-7xl mx-auto px-4`
- Use flex/grid with `md:` and `lg:` breakpoints
- Mobile-first design

---

## ✅ Accessibility

- Buttons: focus rings (`focus:outline-none focus:ring-2 focus:ring-accent`)
- Use semantic HTML (e.g. `<button>`, `<form>`, `<label>`)
- All images must have `alt` text

---

## 📚 Fonts & Typography

- Font: `Inter`, `sans-serif`
- Headings: `font-bold text-white`
- Body: `text-base text-secondary`
- Button Text: `uppercase tracking-wide`

---

## 💡 Final Notes

- Maintain consistent padding/margin between all components.
- Reuse utility classes as much as possible.
- Keep components modular for scalability.

---

> Built with ❤️ to make developer networking fun, accessible and beautiful.