import React, { useContext, useState } from 'react'
import { runInAction } from 'mobx'
import { StoreContext } from 'index'
import { useObserver } from 'mobx-react'
import  Spinner from 'components/Spinner/Spinner'

export default function SermonFilter({ sermonData }) {

    const store = useContext(StoreContext)
    const [loading, setLoading] = useState(false)

    const handleChange = async (e) => {

        setLoading(true)

        if(e.target.id === 'wpfc_preacher'){
            runInAction(() => {
                store.selectedPreacherId = e.target.value
            })
        } else if(e.target.id === 'wpfc_sermon_series'){
            runInAction(() => {
                store.selectedSeriesId = e.target.value
            })
        } else if(e.target.id === 'wpfc_bible_book'){
            runInAction(() => {
                store.selectedBookId = e.target.value
            })
        }
        
        runInAction(async() => {

            const sermonUrl = new URL('https://hillcitysc.com//wp-json/wp/v2/wpfc_sermon?per_page=100')            
            const urlParams = [store.selectedPreacherId, store.selectedSeriesId, store.selectedBookId]

            urlParams.forEach(param => {
                if(param === store.selectedPreacherId && store.selectedPreacherId !== ''){
                    sermonUrl.searchParams.append("wpfc_preacher", `${param}`)
                } else if(param === store.selectedSeriesId && store.selectedSeriesId !== ''){
                    sermonUrl.searchParams.append("wpfc_sermon_series", `${param}`)
                } else if(param === store.selectedBookId && store.selectedBookId !== ''){
                    sermonUrl.searchParams.append("wpfc_bible_book", `${param}`)
                }
            })

            const response = await store.getSermonData(sermonUrl)
            store.sermonData = response
            setLoading(false)
        })
    }

    return useObserver(() => (
        <div className="container">
            <form className="sermon-filter-form-container">
                <div className="form-group">  
                    <label htmlFor="wpfc_preacher">Preacher</label>
                    <select className="form-control" id="wpfc_preacher" onChange={handleChange}>
                        <option value={null}></option>
                        {!store.sermonPreacher.length === 0
                            ? <h4>Loading...</h4>
                            : store.sermonPreacher.map((item) => {
                                return <option key={item.id} value={item.id}>{ item.name }</option>
                            })
                        }
                    </select> 
                </div>
                <div className="form-group">
                    <label htmlFor="wpfc_sermon_series">Sermon Series</label>
                    <select className="form-control" id="wpfc_sermon_series" onChange={handleChange}>
                    <option value={null}></option>
                    {!store.sermonSeries.length === 0
                        ? <h4>Loading...</h4>
                        : store.sermonSeries.map((item) => {
                            return <option key={item.id} value={item.id}>{ item.name }</option>
                        })
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="wpfc_bible_book">Bible Books</label>
                    <select className="form-control" id="wpfc_bible_book" onChange={handleChange}>
                    <option value={null}></option>
                    {!store.sermonBibleBooks.length === 0
                        ? <h4>Loading...</h4>
                        : store.sermonBibleBooks.map((item) => {
                            return <option key={item.id} value={item.id}>{ item.name }</option>
                        })
                    }
                    </select>
                </div>
            </form> 
            {loading
                ? <Spinner /> 
                : null
            }
        </div>
    ))
}
