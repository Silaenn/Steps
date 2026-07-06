import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./modules/shared/Layout";
import { DashboardPage } from "./modules/dashboard/DashboardPage";
import { BuilderPage } from "./modules/builder/BuilderPage";
import { RunnerPage } from "./modules/runner/RunnerPage";
import { ResponsesPage } from "./modules/dashboard/ResponsesPage";
import { useFormStore, SEED_VERSION } from "./core/store";

export default function App() {
  const version = useFormStore((s) => s._seedVersion);

  useEffect(() => {
    if (version < SEED_VERSION) {
      useFormStore.getState().seedStore();
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
        <Route path="/runner/:id" element={<RunnerPage />} />
        <Route path="/responses/:id" element={<ResponsesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
