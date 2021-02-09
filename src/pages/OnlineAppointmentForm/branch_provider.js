import React, { useEffect, useState, useRef } from 'react';
import { actionCreator } from '../../reducers/actionCreator';
import { Form, Input, Select } from 'formik-antd';
import { connect } from 'react-redux';
import { Row, List, Col, Avatar, Divider, Dropdown, Carousel, Radio } from 'antd';
import { MenuO } from './menu';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
require('moment-recur');

const BranchProvider = props => {
  const menu = <MenuO items={props.appointment_type} setFieldValue={props.setFieldValue} />;

  const [providerSchedule, setProviderSchedule] = useState([]);
  const [datelist, setDatelist] = useState([]);
  const [endDate, setEndDate] = useState(moment());
  const no_of_date = 365;
  const [next, setNext] = useState(no_of_date);
  const scheduleRef = useRef([]);
  const timeRef = useRef([]);
  useEffect(() => {
    let providerList = props.provider;
    console.log('***Providerlist', providerList);

    const providerScheduleList = async () => {
      if (providerList.length > 0) {
        console.log('Fetch provider schedule');
        await props.fetchSchedule({
          branch_id: props.values.branch_id,
          end_date: '2021-03-20',
          appointment_id: props.values.appointment_type_id,
        });
      }
    };

    providerScheduleList().then(result => {
      console.log(result);
      setProviderSchedule(props.schedule);
    });
  }, [props.provider]);

  useEffect(() => {
    if (props.values.branch_id && props.values.appointment_type_id) {
      props.fetchProvider({
        type_id: props.values.appointment_type_id,
        branch_id: props.values.branch_id,
      });
    }
  }, [props.values.branch_id, props.values.appointment_type_id]);

  const SampleNextArrow = prop => {
    const { className, style } = prop;

    // scheduleRef.current
    const onClick = () => {
      timeRef.current.innerSlider.slickNext();
      if (scheduleRef) {
        if (scheduleRef.current.length > 0) {
          console.log('Schedule Ref', scheduleRef.current);
          scheduleRef.current.map((result, i) => (result ? result.innerSlider.slickNext() : ''));
        }
      }
    };
    useEffect(() => {
      if (prop.currentSlide > 0 && prop.currentSlide % (no_of_date - 5) == 0) {
        setNext(prev => no_of_date * (Number(prop.currentSlide / (no_of_date - 5)) + 1));
      }
    }, [prop.currentSlide]);

    return (
      <div className={className} style={{ ...style, display: 'block' }} onClick={() => onClick()}>
        <i style={{ color: 'black', fontSize: 20, opacity: 0.7 }} className="fa fa-chevron-right" />
      </div>
    );
  };

  const SamplePrevArrow = prop => {
    const { className, style } = prop;
    const onClick = () => {
      timeRef.current.innerSlider.slickPrev();
      if (scheduleRef) {
        if (scheduleRef.current.length > 0) {
          console.log('Schedule Ref', scheduleRef.current);
          scheduleRef.current.map((result, i) => (result ? result.innerSlider.slickPrev() : ''));
        }
      }
    };

    if (prop.currentSlide == 0) {
      return (
        <div className={className} style={{ ...style, left: -60, display: 'block' }}>
          <i
            style={{ color: 'black', fontSize: 20, opacity: 0.7 }}
            className="fa fa-chevron-left"
          />
        </div>
      );
    } else {
      return (
        <div
          className={className}
          style={{ ...style, display: 'block', left: -60, marginRight: 10 }}
          onClick={() => onClick()}
        >
          <i
            style={{ color: 'black', fontSize: 20, opacity: 0.7 }}
            className="fa fa-chevron-left"
          />
        </div>
      );
    }
  };

  const carousel_props = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const carousel_props1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  };

  useEffect(() => {
    const generate_date = moment(endDate)
      .recur()
      .every(1)
      .days();

    const generateDateList = generate_date.next(next);
    setDatelist(prev => [
      {
        date: moment().format('YYYY-MM-DD'),
        day: moment().format('ddd'),
        dm: moment().format('MMM D'),
      },
      ...generateDateList.map(re => {
        return {
          date: re.format('YYYY-MM-DD'),
          day: re.format('ddd'),
          dm: re.format('MMM D'),
        };
      }),
    ]);
  }, [next]);

  const getSchedule = () => {
    props.fetchSchedule({
      branch_id: 1,
      provider_id: 7,
      end_date: '2021-02-20',
      appointment_id: 2,
    });
  };

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col style={{ fontSize: 16, color: 'black' }} span={20}>
            Our Offices
          </Col>
          <Col span={4}>
            <Dropdown
              overlay={menu}
              // ref={this.clickId}

              trigger={['click']}
            >
              <p
                style={{
                  backgroundColor: '#EDEEEE',
                  textAlign: 'center',
                  borderRadius: 15,
                  padding: 5,
                }}
              >
                <span>
                  {props.values.appointment_type} &nbsp;
                  <DownOutlined />
                </span>
              </p>
            </Dropdown>
          </Col>
        </Row>
      </Col>
      <Divider />
      <Col span={24}>
        {props.branch.map((result, i) => (
          <div key={result.id}>
            <Row
              onClick={() => {
                console.log('Clicked', result.id);
                props.setFieldValue('branch_id', result.id);
              }}
              style={{
                margin: 5,
                padding: 20,
                cursor: 'pointer',
                backgroundColor: props.values.branch_id === result.id ? '#EDEEEE' : 'white',
              }}
            >
              <Col span="2">
                <Avatar
                  style={{
                    color: 'white',
                    backgroundColor: '#00CBE6',
                  }}
                >
                  {i + 1}
                </Avatar>
              </Col>
              <Col span="20">
                <Row>
                  <Col style={{ fontSize: 12 }} span={24}>
                    Location
                  </Col>

                  <Col style={{ fontSize: 16 }} span={24}>
                    <b>{result.fullName.toUpperCase()}</b>
                  </Col>
                  <Col style={{ fontSize: 14 }} span={24}>
                    {result.address}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
          </div>
        ))}
      </Col>
      <Col span={24}>
        <Row align="middle">
          <Col span="10">AVAILABILITY</Col>
          <Col span="13">
            {' '}
            <Carousel ref={timeRef} {...carousel_props}>
              {datelist.map((result, i) => {
                return (
                  <div key={i} style={{ textAlign: 'center', padding: 5 }}>
                    <label style={{ margin: '0px 8px' }}>{result.day}</label>
                    <br />
                    <label style={{ fontSize: '18px' }}>{result.dm}</label>
                  </div>
                );
              })}
            </Carousel>
          </Col>
        </Row>
      </Col>
      <Divider />
      <Col span={24}>
        {props.provider.map((result, i) => {
          return (
            <Row align="middle" key={result.id}>
              <Col span="10">
                <Row style={{ margin: 10, padding: 0 }}>
                  <Col span="4">
                    <Avatar
                      style={{
                        color: 'white',
                        backgroundColor: '#00CBE6',
                      }}
                      src={
                        result.provider?.image ||
                        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                      }
                    ></Avatar>
                  </Col>
                  <Col span="20">
                    <Row>
                      <Col style={{ fontSize: 12 }} span={24}>
                        {result.provider?.provider_type?.name?.toUpperCase() || ''}
                      </Col>
                    </Row>
                    <Col style={{ fontSize: 16 }} span={24}>
                      <b>{result.provider?.fullName?.toUpperCase() || ''}</b>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col span="13">
                <Carousel
                  ref={el => {
                    scheduleRef.current[i] = el;
                  }}
                  {...carousel_props1}
                >
                  {datelist.map((result1, j) => {
                    return props.schedule.filter(
                      res => res.provider_id === result.provider_id && res.date === result1.date,
                    ).length > 0 ? (
                      props.schedule
                        .filter(
                          res =>
                            res.provider_id === result.provider_id && res.date === result1.date,
                        )
                        .map((result4, m) => {
                          return (
                            <div key={i} style={{ textAlign: 'center', padding: 5 }}>
                              {result4.available_time.map((result2, k) => (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      props.setFieldValue('provider_id', result.provider_id);
                                      props.setFieldValue(
                                        'appointment_start',
                                        `${result1.date} ${moment(result2, 'hh:mm A').format(
                                          'HH:mm:ss',
                                        )}`,
                                      );
                                    }}
                                    className="timing"
                                    style={{
                                      margin: 5,
                                      border: 'none',
                                      outline: 'none',
                                      padding: 5,
                                      cursor: 'pointer',
                                      backgroundColor: '#EDEEEE',
                                    }}
                                  >
                                    {result2}
                                  </button>
                                  <br />
                                </>
                              ))}
                            </div>
                          );
                        })
                    ) : (
                      <div></div>
                    );
                  })}
                </Carousel>
              </Col>
              <Divider />
            </Row>
          );
        })}
      </Col>
    </Row>
  );
};
const mapStoreToProps = ({
  OnlineBookingForm,
  CustomForm,
  AppointmentType,
  Branch,
  Provider,
  Schedule,
}) => {
  console.log('Store CustomForm', OnlineBookingForm);
  return {
    OnlineBookingFormPayload: OnlineBookingForm.payload,
    OnlineBookingFormError: OnlineBookingForm.error,
    OnlineBookingFormMessage: OnlineBookingForm.message,
    CustomForm: CustomForm.payload,
    provider: Provider.payload,
    schedule: Schedule.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCustomForm: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_CUSTOMFORM', id })),

  createOnlineForm: (values, contentType) =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_ONLINE_APPOINTMENT',
        values,
        contentType,
      }),
    ),
  fetchAppointmentType: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_TYPE', param })),
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
  fetchProvider: param =>
    dispatch(
      actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH_APPOINTMENT_PROVIDER', param }),
    ),
  fetchSchedule: param => {
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PROVIDER_SCHEDULE', param }));
  },
});

export default connect(mapStoreToProps, mapDispatchToProps)(BranchProvider);
