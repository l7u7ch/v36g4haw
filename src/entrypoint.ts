/*
 * https://docs.astro.build/ja/guides/integrations-guide/alpinejs/
 */

import type { Alpine } from 'alpinejs'
import focus from '@alpinejs/focus'

export default (Alpine: Alpine) => {
  Alpine.plugin(focus)
}
