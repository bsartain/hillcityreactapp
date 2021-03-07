import { createContext } from 'react'
import { getPagesData2 } from 'services/services'

export default function PagesStore(){
    return{
        pagesData: [],
        fetchData: getPagesData2()
    }
}

export const PagesStoreContext = createContext(new PagesStore())