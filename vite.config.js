import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import browserslistToEsbuild from "browserslist-to-esbuild";

export default defineConfig(({ mode }) => {
    const { NODE_ENV } = loadEnv(mode, process.cwd(), "");

    return {
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
                "not op_mini all",
            ]),
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
    };
});
