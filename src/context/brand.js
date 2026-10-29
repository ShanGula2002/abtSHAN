import { createContext, useContext } from 'react'

// Shared between the navbar and the hero:
//   logoTargetRef     the round badge in the navbar the photo flies into
//   logoVisible       opacity of the real navbar logo (0 while the photo is still travelling)
//   activeSection     which home section is on screen, for the navbar highlight
export const BrandContext = createContext(null)

export const useBrand = () => useContext(BrandContext)
