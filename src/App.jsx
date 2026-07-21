// App de desarrollo local. La documentación real del design system vive en Storybook.
export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Joselito — Design System</h1>
        <p className="mt-2 text-sm opacity-70">
          Ejecuta <code>npm run storybook</code> para ver la documentación del sistema.
        </p>
      </div>
    </main>
  );
}
