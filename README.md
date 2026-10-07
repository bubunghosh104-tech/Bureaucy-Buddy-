# 🇮🇳 Bureaucracy Buddy (Citizen Paperwork Guidance Service)

> An accessible, plain-language web application built for hackathons to help everyday citizens in India navigate official paperwork and government procedures.

Designed according to **US / UK Government Digital Service (GDS & USWDS)** design principles: high legibility, clean federal banners, clear task lists, and accessible typography.

---

## 🌟 Key Features

1. **Clean US/UK Government Style Interface**:
   - Official Federal Banner (`Here's how this service works` dropdown)
   - GOV.UK style high-contrast header with saffron civic keyline
   - Accessible task lists and summary cards
   - Prominent search input with hint text and accessible focus rings

2. **Multilingual Support**:
   - 🇬🇧 **English** (Plain, friendly language)
   - 🇮🇳 **हिन्दी (Hindi)** (Everyday Hindi in Devanagari)
   - 🇮🇳 **বাংলা (Bengali)** (Everyday Bengali in Bangla script)

3. **4 Structured Output Sections**:
   - **Service Overview & Costs**: Timeline, government fees, official portal link, and insider tips
   - **Step-by-step application procedure**: Ordered steps with numbered badges
   - **Documents checklist**: Interactive checkboxes with a readiness progress bar and `REQUIRED` / `READY` status badges
   - **Common mistakes to avoid**: GOV.UK warning text pattern with caution callouts

4. **One-Tap Popular Services**:
   - 🛂 Fresh Passport
   - 🪪 Aadhaar Details Update
   - 🚗 Driving Licence & Learner's Licence
   - 🍚 Ration Card
   - 💳 PAN Card (Instant e-PAN)

5. **Security & Privacy**:
   - The API key (`GEMMA_API_KEY`) is stored in `.env.local` and processed **only** on the server side (`src/app/api/assist/route.js`).
   - `.gitignore` ensures that secret files are never uploaded to GitHub.

6. **Offline & Demo Mode**:
   - Includes verified government handbook guides for all common services, so it works reliably during hackathon presentations even without an API key or offline.

---

## 🚀 How to Run Locally

### Option 1: One-Click (Windows)
Double-click the **`start.bat`** file in this folder. It will start the server and open your browser automatically!

### Option 2: Terminal / Command Prompt
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Setting Up Google AI (Gemma)

1. Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `.env.local` and paste your key:
   ```env
   GEMMA_API_KEY=AIzaSyYourSecretKeyHere
   ```
3. Restart your dev server or run `npm run dev`.

---

## ☁️ Deployment on Vercel

1. Push your code to GitHub (your `.env.local` will be automatically ignored).
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In **Project Settings -> Environment Variables**, add:
   - Name: `GEMMA_API_KEY`
   - Value: `your_google_ai_studio_api_key`
4. Click **Deploy**.
