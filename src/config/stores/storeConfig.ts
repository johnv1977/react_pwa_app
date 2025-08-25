/**
 * Configuración de stores con Zustand
 * Arquitectura ABCC - Config Layer
 */

import { subscribeWithSelector } from "zustand/middleware";

export const storeConfig = {
  // Configuración de devtools
  devtools: {
    enabled: process.env.NODE_ENV === "development",
    name: "DnuGame Store",
  },

  // Middlewares por defecto
  defaultMiddlewares: [subscribeWithSelector],

  // Configuración de persistencia
  persistence: {
    name: "dnugame-store",
    version: 1,
  },
};

export default storeConfig;
