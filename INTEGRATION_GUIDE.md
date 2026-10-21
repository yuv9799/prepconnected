# PrepForge Frontend + Backend Integration

The frontend and backend now use matching `/api` endpoint contracts. The frontend expects the backend API root URL (including `/api`) through `VITE_API_URL` in production. Local Vite development continues to proxy `/api` to `http://localhost:8080`.

## Deploy the backend first

1. Create or use a MongoDB Atlas cluster and a database user. Add the appropriate Render outbound network access according to your Atlas network policy.
2. In Render, create a new Blueprint from `https://github.com/yuv9799/prep-backend` on branch `main`. Render reads `render.yaml` in the repository root.
3. Enter `MONGODB_URI` when Render prompts for the unsynchronized variable. The Blueprint generates JWT signing secrets for you. Keep those values private.
4. After deployment, check `https://<your-render-service>.onrender.com/api/health`. The response must be HTTP 200 with `database: "connected"` before login or data features can work.

## Connect and deploy the frontend

1. Open `https://github.com/yuv9799/prep-frontend/settings/variables/actions`.
2. Create a repository Actions variable named `VITE_API_URL` with the value `https://<your-render-service>.onrender.com/api` (replace the sample hostname with the actual Render URL).
3. Check Render's `CLIENT_ORIGIN` includes `https://yuv9799.github.io` for the GitHub Pages frontend. If using a different frontend domain, add that exact origin as well.
4. In the frontend repository, open **Actions → Deploy Prep Frontend to GitHub Pages**, select `master`, and click **Run workflow**. Wait for both build and deploy jobs to succeed.
5. Visit `https://yuv9799.github.io/prep-frontend/` and test registration/login.

The frontend keeps local development on `/api`, stores the returned short-lived access/refresh tokens in session storage for the current tab, and tries to restore a session on page reload. The backend continues to set HTTP-only cookies where the browser permits them; cross-origin requests rely on bearer/refresh tokens as needed.

## Local development

- Backend: copy `backend/.env.example` to `backend/.env`, configure MongoDB and strong JWT secrets, then run `npm ci` and `npm run dev` in `backend/`.
- Frontend: copy `frontend/.env.example` to `frontend/.env.local`, then run `npm ci` and `npm run dev` in `frontend/`.

Do not put production secrets in source code, `.env.example`, or this archive.
