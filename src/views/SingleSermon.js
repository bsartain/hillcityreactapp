import React, { useState, useContext, useEffect } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { formatDate } from 'utils/utils';
import { setPreacher, setSermonSeries } from 'views/SermonContent';

import { useObserver } from 'mobx-react';
import { runInAction, observable } from 'mobx';
import { StoreContext } from 'index';
import { esvApi } from 'utils/utils';
import { RefTagger } from 'react-reftagger';
import { useHistory } from 'react-router-dom';

function SingleSermon(props) {
	const store = useContext(StoreContext);

	const [singleSermonData, setSingleSermonData] = useState([]);
	const [biblePassage, setBiblePassage] = useState([]);

	const history = useHistory();

	const pagesDataArr = observable(store.pagesData);
	pagesDataArr.filter((todo) => todo.id === 8497);

	useEffect(() => {
		async function fetchData() {
			const url = await history.location.pathname;
			const sermonId = await url.substring(url.lastIndexOf('/') + 1);
			const response = await fetch(
				`https://hillcitysc.com/wp-json/wp/v2/wpfc_sermon/${sermonId}`
			);
			const myData = await response.json();
			setSingleSermonData(myData);
		}
		fetchData();

		async function getBibleVerses() {
			const response = await esvApi(singleSermonData.bible_passage);
			setBiblePassage(response);
		}
		getBibleVerses();

		document.body.classList.add('index-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		return function cleanup() {
			document.body.classList.remove('index-page');
			document.body.classList.remove('sidebar-collapse');
		};
	}, [singleSermonData.bible_passage, history.location.pathname]);

	const getMediaPlayer = async () => {
		runInAction(() => {
			store.mediaPlayerIsDisplayed = true;
			store.singleSermonData = singleSermonData;
			store.isPlaying = !store.isPlaying;
		});
	};

	return useObserver(() => (
		<>
			<div className='wrapper page-content-container single-sermon-container'>
				{singleSermonData.length === 0 ? (
					<SpinnerFullPage />
				) : (
					<div>
						<RefTagger
							noSearchTagNames={['h1', 'h2', 'h3', 'h4', 'h5']}
							bibleVersion={'ESV'}
						/>
						<PageHeader headerData={singleSermonData} />
						<div className='page-content-title'>
							<p>{formatDate(singleSermonData.date)}</p>
							<h2
								className='container'
								dangerouslySetInnerHTML={{
									__html: singleSermonData.title.rendered,
								}}
							/>
							<hr className='page-content-hr' />
						</div>
						<div className='single-sermon-details container'>
							<div>
								<p>
									<span className='item-detail'>Preacher: </span>
									{setPreacher(singleSermonData.wpfc_preacher)}{' '}
								</p>
							</div>
							<div>
								<p>
									<span className='item-detail'>Series:</span>{' '}
									{setSermonSeries(singleSermonData.wpfc_sermon_series)}
								</p>
							</div>
							<div>
								<p>
									<span className='item-detail'>Passage:</span>{' '}
									{singleSermonData.bible_passage}
								</p>
							</div>
						</div>
						<div
							className='container single-sermon-play-button'
							onClick={() => {
								getMediaPlayer();
							}}>
							<i className='now-ui-icons media-1_button-play'></i>
						</div>
						<hr />
						<div className='container single-sermon-bible-container'>
							<div
								dangerouslySetInnerHTML={{
									__html: biblePassage.passages.map((verses) => verses),
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	));
}

export default SingleSermon;
