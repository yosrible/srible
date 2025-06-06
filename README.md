# Srible Frontend

Modern, minimalist blogging platform built with SvelteKit

![Srible](https://srible.com/logo.png)

## Overview

Srible is a clean, distraction-free blogging platform designed for writers who value simplicity and elegance. Built with SvelteKit and featuring a minimalist UI, Srible enables users to focus on what matters most: their content.

## Key Features

- **Minimalist Design:** Soft off-white (#f8f8f5) background with clean typography and minimal UI elements
- **Distraction-Free Editor:** Full-viewport Quill.js editor with automatic sidebar hiding for immersive writing
- **Dashboard Experience:** Color-coded sections for easy navigation:
  - Overview (Blue)
  - Posts (Green)
  - Analytics (Purple)
  - Settings (Amber)
  - Themes (Pink)
- **Fully Responsive:** Optimized for all devices from mobile to desktop
- **Modern Authentication:** Secure login and signup flow with Supabase integration

## Design Philosophy

Srible embraces minimalism by:
- Eliminating unnecessary animations and decorative elements
- Using intentional whitespace and clean typography
- Focusing on content with a distraction-free editor experience
- Implementing intuitive navigation with modern icon choices

## Tech Stack

- **Frontend Framework:** SvelteKit
- **Styling:** TailwindCSS
- **Editor:** Custom
- **Authentication:** Supabase
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yosrible/srible_frontend.git
cd srible_frontend
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open your browser at `http://localhost:5173`

## Building for Production

```bash
pnpm build
```

## Environment Variables

Create a `.env` file in the project root with:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

X - [@yosrible](https://x.com/yosrible)

Project Link: [https://github.com/yosrible/srible_frontend](https://github.com/yosrible/srible_frontend)
