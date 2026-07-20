function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">Joselito — Design System</h1>
      <p className="max-w-md text-neutral-600">
        Librería de componentes (React + Tailwind + GSAP). La documentación y
        los componentes viven en Storybook.
      </p>
      <code className="rounded bg-neutral-100 px-3 py-1 text-sm">
        npm run storybook
      </code>
    </main>
  );
}

export default App;
