# Deploy LegacyAI

## Free public demo (frontend only)

This is the quickest way to get a shareable `vercel.app` link. It runs the React interface with its built-in demo data. It does not connect to the FastAPI server, save uploaded files, or provide persistent user accounts.

1. Create a GitHub repository and upload this project folder. Do not upload `.env` files, the virtual environment, `node_modules`, local SQLite databases, or real user data.
2. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy it as a Vite project. The repository root is the frontend root.
3. In the Vercel project settings, add this environment variable, then redeploy:
   - `VITE_USE_DEMO_AUTH` = `true`
   - `VITE_API_BASE_URL` = `/api`
4. Use the demo accounts listed in `README.md`. These are public demonstration credentials; never use them for a real organization.

The included `vercel.json` sends browser routes such as `/employee` back to the React app so they continue working after refresh.

## Connect the FastAPI backend

The backend is a separate Python service. Once it is deployed and has a public URL:

1. Set Vercel's `VITE_USE_DEMO_AUTH` to `false`.
2. Set Vercel's `VITE_API_BASE_URL` to `https://YOUR-BACKEND-URL/api` and redeploy.
3. Set the backend's `ALLOWED_ORIGINS` to the exact Vercel site origin, such as `https://YOUR-SITE.vercel.app`.
4. Set a long random `JWT_SECRET` in the backend's host settings. Never commit it or put it in a `VITE_` variable.

The backend requires Python 3.11+. From the `backend` directory, install `requirements.txt` and run:

```sh
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Data and free-host limitations

The supplied backend uses SQLite and writes uploaded files to its local `uploads` directory by default. Free web services commonly have temporary local storage, so database changes and uploads may disappear after a restart or redeploy. Use a persistent PostgreSQL database and durable object storage (for example, Cloudflare R2) before relying on this for real data. The embedding dependency can also be resource-heavy for a free backend instance. The included frontend-only demo avoids those backend requirements.

Do not publish real company documents, employee data, API keys, or passwords in the repository. The ZIP provided for preparation contained a local `.env`; it was intentionally left out of this clean deployment copy.
