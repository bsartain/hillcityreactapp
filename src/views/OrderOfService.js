import React, { useEffect, useState, forwardRef } from "react";

import { Link } from "react-router-dom";
import { esvApi } from "utils/utils";

import { NavItem, NavLink, Nav, TabContent, TabPane } from "reactstrap";
import catechismData from "data/catechismData";

export const OrderOfService = forwardRef(({ printLogo }, ref) => {
  const [orderOfServiceData, setOrderOfServiceData] = useState([]);

  const [callToWorship, setCallToWorship] = useState([]);
  const [confessionOfSins, setConfessionOfSins] = useState([]);
  const [assuranceOfGrace, setAssuranceOfGrace] = useState([]);
  const [scriptureReading, setScriptureReading] = useState([]);

  const [benediction, setBenediction] = useState([]);
  const [iconPills, setIconPills] = useState("1");

<<<<<<< HEAD
  useEffect(() => {
    const call = async () => {
      const response = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
      const data = await response.json();
      setOrderOfServiceData([data.acf]);
      esvApi(data.acf.call_to_worship_verse).then((data) => setCallToWorship(data.passages));
      esvApi(data.acf.confession_of_sin_verse).then((data) => setConfessionOfSins(data.passages));
      esvApi(data.acf.assurance_of_grace_verse).then((data) => setAssuranceOfGrace(data.passages));
      esvApi(data.acf.scripture_reading).then((data) => setScriptureReading(data.passages));
      esvApi(data.acf.benediction_verse).then((data) => setBenediction(data.passages));
    };
    call();
  }, []);

  const setContent = (title, content) => {
    let catechismQuestion;
    let catechismAnswer;
    let contentDiv = <div className="order-service-div" dangerouslySetInnerHTML={{ __html: content }} />;
    let header = title;

    if (title === "Offertory") {
      contentDiv = (
        <Link to="/give" className="btn btn-primary">
          Give Online
        </Link>
      );
    } else if (title === "Catechism") {
      header = `Catechism Question ${content}`;
      contentDiv = (
        <div>
          {catechismData
            ? catechismData.forEach((item, index) => {
                if (content - 1 === index) {
                  catechismQuestion = item.question;
                  catechismAnswer = item.answer.adult;
                }
              })
            : null}
          <p>
            <span style={{ fontWeight: "900" }}>QUESTION: </span>
            {catechismQuestion}
          </p>
          <p>
            <span style={{ fontWeight: "900" }}>ANSWER: </span>
            {catechismAnswer}
          </p>
        </div>
      );
    } else if (title === "Announcements") {
      return (
        <div>
          {content.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.announcement_title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.announcement_content,
                  }}
                />
                {item.announcement_start ? (
                  <div className="show-announcements">
                    <span>Begin: </span>
                    <span>{item.announcement_start}</span>
                  </div>
                ) : null}
                {item.announcement_end ? (
                  <div className="show-announcements">
                    <span>End: </span>
                    <span>{item.announcement_end}</span>
                  </div>
                ) : null}
                {item.announcement_location ? (
                  <div className="show-announcements">
                    <span>Location: </span>
                    <span>{item.announcement_location}</span>
                  </div>
                ) : null}
                <hr className="order-service-hr" />
              </div>
            );
          })}
        </div>
      );
    } else if (title === "prayerRequests" || title === "") {
      title = null;
      return content.map((item, index) => {
        return (
          <div key={index}>
            <h3 style={{ marginBottom: "15px" }}>
              <span style={{ color: "#caac5e" }}>{item.request_type}: </span>
              {item.title}
            </h3>
            <p>
              <span style={{ fontWeight: 900 }}>Submitted By:</span> {item.name}
            </p>
            <p>{item.prayer_request}</p>
            <hr className="order-service-hr" />
          </div>
        );
      });
    } else if (title === "Scripture Reading" || title === "Call To Worship" || title === "Confession of Sin" || title === "Assurance of Grace" || title === "Benediction") {
      return (
        <div className="scripture-reading-container">
          <h3>{title}</h3>
          {title === "Confession of Sin" ? (
            <p>
              This is the time in our service where we confess our sins before God. Cleansing and freedom begin with being honest with our sins and failures before God so that He can restore us back
              to Joy and peace. Take a few moments to confess sin before God. You can use this scripture to help you do that.
            </p>
          ) : null}
          {title === "Assurance of Grace" ? (
            <p>You cannot out sin God's grace. The power of the cross is such that Jesus made His love and forgiveness more powerful toward you than your offenses toward Him.</p>
          ) : null}
          {title === "Offertory" ? (
            <div>
              <p>In response to what the Lord has done for us, let's worship Him in the giving of our tithes and offerings.</p>
              <p>
                We do this as an expression of joy and gratitude, not obligation. Below you'll find a link to our giving page. If you are a member of Hill City Church please give joyously and
                generously.
              </p>
            </div>
          ) : null}
          {content.map((item, index) => {
            return (
              <div key={index}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            );
          })}
          <hr className="order-service-hr" />
        </div>
      );
    } else {
      return (
        <div>
          <h3>{header}</h3>
          {contentDiv}
          <hr className="order-service-hr" />
        </div>
      );
    }
  };

  let callToWorshipVerse;
  let confessionOfSinVerse;
  let assuranceOfGraceVerse;
  let offertory;
  let scriptureVerses;
  let catechism;
  let benedictionContent;
  let preacherTitle;
  let songOne;
  let songTwo;
  let songThree;
  let miscellaneousContent;
  let announcements;
  let prayerRequests;

  return (
    <div className="order-service-container">
      <Nav role="tablist" tabs>
        <NavItem>
          <NavLink
            className={iconPills === "1" ? "active" : ""}
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              setIconPills("1");
            }}
          >
            <div className="nav-pill">
              <i className="fas fa-bible"></i>
              <div className="pill-title">Order of Service</div>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={iconPills === "2" ? "active" : ""}
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              setIconPills("2");
            }}
          >
            <div className="nav-pill">
              <i className="fas fa-calendar-alt"></i>
              <div className="pill-title">Calendar</div>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={iconPills === "3" ? "active" : ""}
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              setIconPills("3");
            }}
          >
            <div className="nav-pill">
              <i className="fas fa-praying-hands"></i>
              <div className="pill-title">Prayer Requests</div>
            </div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={"iconPills" + iconPills} className="tab-pane-swipe">
        <TabPane tabId="iconPills1">
          <div className="print-order-service" ref={ref}>
            {orderOfServiceData.length === 0
              ? null
              : // eslint-disable-next-line array-callback-return
                orderOfServiceData.map((item) => {
                  // eslint-disable-next-line no-unused-vars
                  for (const property in item) {
                    callToWorshipVerse = setContent("Call To Worship", callToWorship);
                    songOne = setContent(`Song - ${item["song_one_title"]}`, item["song_one_lyrics"]);
                    confessionOfSinVerse = setContent("Confession of Sin", confessionOfSins);
                    assuranceOfGraceVerse = setContent("Assurance of Grace", assuranceOfGrace);
                    offertory = setContent("Offertory", null);
                    songTwo = setContent(`Song - ${item["song_two_title"]}`, item["song_two_lyrics"]);
                    scriptureVerses = setContent("Scripture Reading", scriptureReading);
                    preacherTitle = setContent(`Sermon: ${item["preacher"]}`, null);
                    catechism = setContent("Catechism", item["catechism_question_number"]);
                    songThree = setContent(`Song - ${item["song_three_title"]}`, item["song_three_lyrics"]);
                    benedictionContent = setContent("Benediction", benediction);
                    miscellaneousContent = setContent(null, item["miscellaneous_info"]);
                    announcements = setContent("Announcements", item["announcements_section"]);
                    prayerRequests = setContent("prayerRequests", item["prayer_requests_section"]);
                  }
                })}
            <div className="print-order-service" ref={ref}>
              {printLogo ? (
                <div
                  style={{
                    display: "flex",
                    margin: "25px 0px",
                    justifyContent: "center",
                    borderBottom: "1px solid #eeeeee",
                    paddingBottom: "39px",
                    marginBottom: "39px",
                  }}
                >
                  <img src="https://hillcitysc.com/wp-content/uploads/2021/02/HC-print-masthead-logo-e1612377440345.png" alt="Hill City Church: Rock Hill SC" />
                </div>
              ) : null}
              {callToWorshipVerse}
              {songOne}
              {confessionOfSinVerse}
              {assuranceOfGraceVerse}
              {offertory}
              {songTwo}
              {scriptureVerses}
              {preacherTitle}
              {catechism}
              {songThree}
              {benedictionContent}
              {miscellaneousContent}
            </div>
          </div>
        </TabPane>
        <TabPane tabId="iconPills2">{announcements}</TabPane>
        <TabPane tabId="iconPills3">{prayerRequests}</TabPane>
      </TabContent>
    </div>
  );
=======
	useEffect(() => {
		const call = async () => {
			const response = await fetch('https://hillcitysc.com/wp-json/acf/v3/posts/8857');
			const data = await response.json();
			setOrderOfServiceData([data.acf]);
			esvApi(data.acf.call_to_worship_verse).then((data) => setCallToWorship(data.passages[0]));
			esvApi(data.acf.confession_of_sin_verse).then((data) => setConfessionOfSins(data.passages[0]));
			esvApi(data.acf.assurance_of_grace_verse).then((data) => setAssuranceOfGrace(data.passages[0]));
			esvApi(data.acf.scripture_reading).then((data) => setScriptureReading(data.passages));
			esvApi(data.acf.benediction_verse).then((data) => setBenediction(data.passages[0]));
		};
		call();
	}, []);

	const setContent = (title, content) => {
		let catechismQuestion;
		let catechismAnswer;
		let contentDiv = <div className='order-service-div' dangerouslySetInnerHTML={{ __html: content }} />;
		let header = title;

		if (title === 'Offertory') {
			contentDiv = (
				<Link to='/give' className='btn btn-primary'>
					Give Online
				</Link>
			);
		} else if (title === 'Catechism') {
			header = `Catechism Question ${content}`;
			contentDiv = (
				<div>
					{catechismData
						? catechismData.forEach((item, index) => {
								if (content - 1 === index) {
									catechismQuestion = item.question;
									catechismAnswer = item.answer.adult;
								}
						  })
						: null}
					<p>
						<span style={{ fontWeight: '900' }}>QUESTION: </span>
						{catechismQuestion}
					</p>
					<p>
						<span style={{ fontWeight: '900' }}>ANSWER: </span>
						{catechismAnswer}
					</p>
				</div>
			);
		} else if (title === 'Announcements') {
			return (
				<div>
					{content.map((item, index) => {
						return (
							<div key={index}>
								<h3>{item.announcement_title}</h3>
								<div
									dangerouslySetInnerHTML={{
										__html: item.announcement_content,
									}}
								/>
								{item.announcement_start ? (
									<div className='show-announcements'>
										<span>Begin: </span>
										<span>{item.announcement_start}</span>
									</div>
								) : null}
								{item.announcement_end ? (
									<div className='show-announcements'>
										<span>End: </span>
										<span>{item.announcement_end}</span>
									</div>
								) : null}
								{item.announcement_location ? (
									<div className='show-announcements'>
										<span>Location: </span>
										<span>{item.announcement_location}</span>
									</div>
								) : null}
								<hr className='order-service-hr' />
							</div>
						);
					})}
				</div>
			);
		} else if (title === 'prayerRequests') {
			title = null;
			return content.map((item, index) => {
				return (
					<div key={index}>
						<h3 style={{ marginBottom: '15px' }}>
							<span style={{ color: '#caac5e' }}>{item.request_type}: </span>
							{item.title}
						</h3>
						<p>
							<span style={{ fontWeight: 900 }}>Submitted By:</span> {item.name}
						</p>
						<p>{item.prayer_request}</p>
						<hr className='order-service-hr' />
					</div>
				);
			});
		} else if (title === 'Scripture Reading') {
			return (
				<div className='scripture-reading-container'>
					<h3>Scripture reading</h3>
					{content.map((item, index) => {
						return (
							<div key={index}>
								<div dangerouslySetInnerHTML={{ __html: item }} />
							</div>
						);
					})}
					<hr className='order-service-hr' />
				</div>
			);
		}

		return (
			<div>
				<h3>{header}</h3>
				{title === 'Confession of Sin' ? (
					<p>
						This is the time in our service where we confess our sins before God. Cleansing and freedom begin with being honest with our sins and
						failures before God so that He can restore us back to Joy and peace. Take a few moments to confess sin before God. You can use this
						scripture to help you do that.
					</p>
				) : null}
				{title === 'Assurance of Grace' ? (
					<p>
						You cannot out sin God's grace. The power of the cross is such that Jesus made His love and forgiveness more powerful toward you than your
						offenses toward Him.
					</p>
				) : null}
				{title === 'Offertory' ? (
					<div>
						<p>In response to what the Lord has done for us, let's worship Him in the giving of our tithes and offerings.</p>
						<p>
							We do this as an expression of joy and gratitude, not obligation. Below you'll find a link to our giving page. If you are a member of
							Hill City Church please give joyously and generously.
						</p>
					</div>
				) : null}
				{contentDiv}
				<hr className='order-service-hr' />
			</div>
		);
	};

	let callToWorshipVerse;
	let confessionOfSinVerse;
	let assuranceOfGraceVerse;
	let offertory;
	let scriptureVerses;
	let catechism;
	let benedictionContent;
	let preacherTitle;
	let songOne;
	let songTwo;
	let songThree;
	let miscellaneousContent;
	let announcements;
	let prayerRequests;

	return (
		<div className='order-service-container'>
			<Nav role='tablist' tabs>
				<NavItem>
					<NavLink
						className={iconPills === '1' ? 'active' : ''}
						href='#pablo'
						onClick={(e) => {
							e.preventDefault();
							setIconPills('1');
						}}>
						<div className='nav-pill'>
							<i className='fas fa-bible'></i>
							<div className='pill-title'>Order of Service</div>
						</div>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={iconPills === '2' ? 'active' : ''}
						href='#pablo'
						onClick={(e) => {
							e.preventDefault();
							setIconPills('2');
						}}>
						<div className='nav-pill'>
							<i className='fas fa-calendar-alt'></i>
							<div className='pill-title'>Calendar</div>
						</div>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={iconPills === '3' ? 'active' : ''}
						href='#pablo'
						onClick={(e) => {
							e.preventDefault();
							setIconPills('3');
						}}>
						<div className='nav-pill'>
							<i className='fas fa-praying-hands'></i>
							<div className='pill-title'>Prayer Requests</div>
						</div>
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={'iconPills' + iconPills} className='tab-pane-swipe'>
				<TabPane tabId='iconPills1'>
					<div className='print-order-service' ref={ref}>
						{orderOfServiceData.length === 0
							? null
							: // eslint-disable-next-line array-callback-return
							  orderOfServiceData.map((item) => {
									// eslint-disable-next-line no-unused-vars
									for (const property in item) {
										callToWorshipVerse = setContent('Call To Worship', callToWorship);
										songOne = setContent(`Song - ${item['song_one_title']}`, item['song_one_lyrics']);
										confessionOfSinVerse = setContent('Confession of Sin', confessionOfSins);
										assuranceOfGraceVerse = setContent('Assurance of Grace', assuranceOfGrace);
										offertory = setContent('Offertory', null);
										songTwo = setContent(`Song - ${item['song_two_title']}`, item['song_two_lyrics']);
										scriptureVerses = setContent('Scripture Reading', scriptureReading);
										preacherTitle = setContent(`Sermon: ${item['preacher']}`, null);
										catechism = setContent('Catechism', item['catechism_question_number']);
										songThree = setContent(`Song - ${item['song_three_title']}`, item['song_three_lyrics']);
										benedictionContent = setContent('Benediction', benediction);
										miscellaneousContent = setContent(null, item['miscellaneous_info']);
										announcements = setContent('Announcements', item['announcements_section']);
										prayerRequests = setContent('prayerRequests', item['prayer_requests_section']);
									}
							  })}
						<div className='print-order-service' ref={ref}>
							{printLogo ? (
								<div
									style={{
										display: 'flex',
										margin: '25px 0px',
										justifyContent: 'center',
										borderBottom: '1px solid #eeeeee',
										paddingBottom: '39px',
										marginBottom: '39px',
									}}>
									<img
										src='https://hillcitysc.com/wp-content/uploads/2021/02/HC-print-masthead-logo-e1612377440345.png'
										alt='Hill City Church: Rock Hill SC'
									/>
								</div>
							) : null}
							{callToWorshipVerse}
							{songOne}
							{confessionOfSinVerse}
							{assuranceOfGraceVerse}
							{offertory}
							{songTwo}
							{scriptureVerses}
							{preacherTitle}
							{catechism}
							{songThree}
							{benedictionContent}
							{miscellaneousContent}
						</div>
					</div>
				</TabPane>
				<TabPane tabId='iconPills2'>{announcements}</TabPane>
				<TabPane tabId='iconPills3'>{prayerRequests}</TabPane>
			</TabContent>
		</div>
	);
>>>>>>> 54209f0279d3ab3e6c485bc8ecfb931e75d21078
});
