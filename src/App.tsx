import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./modules/shared/Layout";
import { DashboardPage } from "./modules/dashboard/DashboardPage";
import { BuilderPage } from "./modules/builder/BuilderPage";
import { RunnerPage } from "./modules/runner/RunnerPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
        <Route path="/runner/:id" element={<RunnerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
