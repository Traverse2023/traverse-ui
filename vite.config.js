import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import browserslistToEsbuild from "browserslist-to-esbuild";

export default defineConfig({
    base: "",
    plugins: [react(), viteTsconfigPaths()],
    server: {
        open: false,
        port: 3000,
    },
    build: {
        target: browserslistToEsbuild([
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]),
    },
});
