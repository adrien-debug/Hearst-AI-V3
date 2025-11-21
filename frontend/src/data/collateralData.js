/**
 * Collateral Data Loader
 * Charge les données collatérales depuis l'API DeBank au lieu des mocks
 */

import API from '../../js/api.js';
import { getClientsWithMetrics } from '../utils/collateralMetrics.js';
import { WATCHED_WALLETS } from '../config/wallets.js';

/**
 * Liste des wallets à surveiller
 * Importée depuis la configuration centralisée
 */
const WALLETS_TO_MONITOR = WATCHED_WALLETS;

/**
 * Charge les données collatérales depuis l'API
 * @param {Object} options
 * @param {string[]} [options.wallets] - Liste des wallets (défaut: WALLETS_TO_MONITOR)
 * @param {string[]} [options.chains] - Liste des chains (défaut: ["eth"])
 * @param {string[]} [options.protocols] - Liste des protocoles autorisés
 * @returns {Promise<Array>} Liste des clients avec métriques calculées
 */
export async function loadCollateralClients(options = {}) {
  try {
    const {
      wallets = WALLETS_TO_MONITOR,
      chains = ['eth'],
      protocols = []
    } = options;

    // Appel API
    const response = await API.getCollateralClients({
      wallets,
      chains,
      protocols
    });

    // response.clients contient les données au format CollateralClient
    const clients = response.clients || [];

    // Calculer les métriques pour chaque client
    const clientsWithMetrics = getClientsWithMetrics(clients);

    return clientsWithMetrics;
  } catch (error) {
    console.error('[Collateral Data] Erreur lors du chargement:', error);
    
    // En cas d'erreur, retourner un tableau vide ou fallback sur les mocks
    // TODO: Implémenter un système de cache/fallback si nécessaire
    return [];
  }
}

/**
 * Charge les données collatérales avec gestion du cache
 * @param {number} cacheDuration - Durée du cache en ms (défaut: 60000 = 1 minute)
 */
let cachedData = null;
let cacheTimestamp = 0;

export async function loadCollateralClientsCached(options = {}, cacheDuration = 60000) {
  const now = Date.now();
  
  // Utiliser le cache si disponible et valide
  if (cachedData && (now - cacheTimestamp) < cacheDuration) {
    return cachedData;
  }

  // Charger les nouvelles données
  const data = await loadCollateralClients(options);
  
  // Mettre à jour le cache
  cachedData = data;
  cacheTimestamp = now;
  
  return data;
}

/**
 * Export pour compatibilité avec l'ancien code
 * @deprecated Utiliser loadCollateralClients() à la place
 */
export async function getCollateralClients() {
  return loadCollateralClients();
}

