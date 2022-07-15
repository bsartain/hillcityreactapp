import React, { useContext, useEffect, useState } from 'react';

import PageHeader from 'components/Headers/PageHeader.js';
import SpinnerFullPage from 'components/Spinner/SpinnerFullPage';
import { RefTagger } from 'react-reftagger';

import { useObserver } from 'mobx-react';
import { StoreContext } from 'stores/StoreContext';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsTrackPage } from 'utils/utils';
import Meta from 'components/Meta';
import WPAPI from 'wpapi';
import { Spinner, Modal, ModalHeader, ModalFooter } from 'reactstrap';

function Signup() {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [meal, setMeal] = useState('');
  const [signupPosts, setSignupPosts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('');

  const wp = new WPAPI({
    endpoint: 'https://hillcitysc.com/wp-json',
    username: 'hcteam',
    password: 'zaLh clgf 0QZQ CuzE GV15 NAa9',
  });

  useEffect(() => {
    googleAnalyticsTrackPage(history.location.pathname);
    //https://hillcitysc.com/wp-json/acf/v3/posts?categories=188

    //READ POSTS
    const fetchPosts = async () => {
      const response = await wp.posts().categories(188);
      setSignupPosts(response);
    };
    fetchPosts();

    if (!localStorage.getItem('mealIds')) {
      const meals = [];
      localStorage.setItem('mealIds', JSON.stringify(meals));
    }

    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
    };
  }, [history.location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && meal && date) {
      try {
        setSpinner(true);
        const createPost = async () => {
          await wp
            .posts()
            .create({
              title: name,
              content: meal,
              excerpt: date,
              categories: [188],
              fields: {
                name_provider: name,
                meal_provider: meal,
                date_provider: date,
              },
              status: 'publish',
            })
            .then(async () => {
              const response = await wp.posts().categories(188);
              const id = response[0].id;
              const getMealIds = JSON.parse(localStorage.getItem('mealIds'));
              const addMealId = [...getMealIds, id];
              localStorage.setItem('mealIds', JSON.stringify(addMealId));
              setSignupPosts(response);
              setName('');
              setMeal('');
              setDate('');
              setSpinner(false);
            });
        };
        createPost();
      } catch (error) {
        console.log('ERROR: ', error);
      }
    } else {
      console.log('You must select all three');
    }
  };

  const toggle = () => {
    setShowModal(!showModal);
  };

  const deleteMeal = async (id) => {
    setSpinner(true);
    await wp.posts().id(id).delete();
    const getMealIds = JSON.parse(localStorage.getItem('mealIds'));
    var removeMeal = getMealIds.filter((item) => {
      return item !== id;
    });
    localStorage.setItem('mealIds', JSON.stringify(removeMeal));
    const response = await wp.posts().categories(188);
    setSignupPosts(response);
    setShowModal(false);
    setSpinner(false);
  };

  const formatDate = (date) => {
    const formattedDate = date.replace(/(<([^>]+)>)/gi, '').slice(5);
    return formattedDate;
  };

  const removePTags = (text) => {
    const formattedText = text.replace(/(<([^>]+)>)/gi, '');
    return formattedText;
  };

  return useObserver(() => (
    <>
      <div className="wrapper page-content-container">
        {store.pagesStore.pagesData.length === 0 ? (
          <SpinnerFullPage />
        ) : (
          store.pagesStore.pagesData
            .filter((page) => page.id === 10638)
            .map((page, index) => {
              return (
                <div key={index}>
                  <Meta title={page.title.rendered} description={page.content.rendered} image={page.better_featured_image.source_url} url={window.location.href} />
                  <RefTagger />
                  <PageHeader headerData={page} />
                  <div className="page-content-title">
                    <h2 className="container">{page.title.rendered}</h2>
                    <hr className="page-content-hr" />
                  </div>
                  <div className="container" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />;
                  <div className="container">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Meal</label>
                        <input type="text" className="form-control" id="meal" placeholder="Meal" value={meal} onChange={(e) => setMeal(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="date">Select Date</label>
                        <input type="date" className="form-control" id="date" placeholder="Select Date" required value={date} onChange={(e) => setDate(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      {spinner ? <Spinner color="dark" type="grow" style={{ margin: '0px 0px -7px 10px' }} /> : null}
                    </form>
                    <div className="table-responsive">
                      <table className="table table-striped" style={{ marginTop: '50px' }}>
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Meal</th>
                            <th scope="col">Date</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!signupPosts
                            ? null
                            : signupPosts.map((item, index) => {
                                return (
                                  <tr key={index} className="signup-tr">
                                    <td className="sign-up text-nowrap">{item.title.rendered}</td>
                                    <td
                                      dangerouslySetInnerHTML={{
                                        __html: removePTags(item.content.rendered),
                                      }}
                                      className="sign-up text-nowrap"
                                    />
                                    <td
                                      dangerouslySetInnerHTML={{
                                        __html: formatDate(item.excerpt.rendered),
                                      }}
                                      className="sign-up text-nowrap"
                                    />
                                    <td className="text-nowrap delete-meal">
                                      {JSON.parse(localStorage.getItem('mealIds'))
                                        ? JSON.parse(localStorage.getItem('mealIds')).map((storageId, index) => {
                                            if (storageId === item.id) {
                                              return (
                                                <button
                                                  key={index}
                                                  className="btn btn-sm btn-primary"
                                                  onClick={() => {
                                                    toggle();
                                                    setItemId(item.id);
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                              );
                                            }
                                          })
                                        : null}
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <Modal isOpen={showModal} toggle={toggle} className="signup-modal">
                      <ModalHeader toggle={() => toggle()}>Are you sure you want to delete this item?</ModalHeader>
                      <ModalFooter className="signup-modal-footer">
                        <button className="btn btn-primary" color="secondary" onClick={() => toggle()}>
                          Cancel
                        </button>
                        <button className="btn btn-primary" color="primary" onClick={() => deleteMeal(itemId)}>
                          Delete
                        </button>{' '}
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </>
  ));
}

export default Signup;
