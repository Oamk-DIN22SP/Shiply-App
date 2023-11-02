## 💻 Frontend

How we are building the frontend of the application:

### Steps

- [ ] `npm create vite@latest frontend -- --template react-ts`
- [ ] `cd frontend`
- [ ] `npm install`
- [ ] `npm run dev` - to start the development server.
- [ ] Add Tailwind and its configuration

```
npm install -D tailwindcss postcss autoprefixer
 
npx tailwindcss init -p
```

- [ ] Edit `tsconfig.json` file

```{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```
- [ ] Update `vite.config.ts`
- [ ] `npm i -D @types/node`
  
```import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

- [ ] `npx shadcn-ui@latest init` - to install Shadcn UI (Select All answer to Yes)


### That's it.

Demo use of Shadcn UI

```
npx shadcn-ui@latest add button
```
```
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```




---

[Back to Homepage](README.md)