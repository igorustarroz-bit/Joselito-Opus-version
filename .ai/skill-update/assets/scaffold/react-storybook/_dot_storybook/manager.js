// Botón de icono «Columnas» en la barra de Storybook (toggle, no desplegable).
// Activa/desactiva el global `grid` ('on' | 'off'); el decorador de preview.jsx pinta la rejilla.
// Atajo: Alt+G. Para capturas: iframe.html?id=<story>&globals=grid:on
import React, { useCallback, useEffect } from 'react';
import { addons, types, useGlobals, useStorybookApi } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { GridIcon } from '@storybook/icons';
import { hanzoTheme } from './theme';

// Interfaz con Inter (tema compartido con las páginas de doc)
addons.setConfig({ theme: hanzoTheme });

const ADDON_ID = 'hanzo/grid-overlay';
const TOOL_ID = `${ADDON_ID}/tool`;

function GridToggle() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();
  const on = globals.grid === 'on';
  const toggle = useCallback(() => updateGlobals({ grid: on ? 'off' : 'on' }), [on, updateGlobals]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Mostrar/ocultar columnas',
      defaultShortcut: ['alt', 'G'],
      actionName: 'toggleGrid',
      showInMenu: false,
      action: toggle,
    });
  }, [toggle, api]);

  return React.createElement(
    IconButton,
    { key: TOOL_ID, 'data-hz-grid': '', active: on, title: on ? 'Ocultar columnas (Alt+G)' : 'Mostrar columnas (Alt+G)', 'aria-pressed': on, onClick: toggle },
    React.createElement(GridIcon),
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Columnas',
    match: ({ viewMode, tabId }) => !!viewMode?.match(/^(story|docs)$/) && !tabId,
    render: GridToggle,
  });
});
