import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

//staging ==>.env.staging
if (process.env.ENVIRONMENT) {
  config({
    path: `.env.${process.env.ENVIRONMENT}`,
    override: true,
  });
} else {
  config();
}

export default defineConfig({
  testDir: "./e2e/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {},

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
