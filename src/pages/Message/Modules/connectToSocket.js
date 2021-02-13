import socketIOClient from 'socket.io-client';
import { DeliveryStatus } from '_constants/message';
import { store } from '../../../reducers/configureStore';

export const ENDPOINT = 'http://localhost:3020';
export const socket = socketIOClient(ENDPOINT);

export const connectToSocket = async () => {
  socket.on('FromAPI', data => {
    console.log(data);
  });

  socket.on('connect', () => {
    socket.emit('authenticate', { token: 'key' });
  });

  socket.on('disconnect', () => {
    console.log('message disconnect');
  });

  socket.on('incoming_hospital', data => {
    console.log('message incoming_hospital', data);
  });

  socket.on('incoming', data => {
    store.dispatch({ type: 'SET_LATEST_INCOMING_MESSAGE_SUMMARY', payload: data.message });
    store.dispatch({ type: 'SET_INCOMING_MESSAGE', payload: data.message });

    console.log('message incoming', data);
  });

  socket.on('authenticate_success', data => {
    console.log('message authenticate_success', data);
  });

  socket.on('message_summary_success', data => {
    store.dispatch({ type: 'SET_MESSAGE_SUMMARY', payload: data });
    console.log('message message_summary_sucess', data);
  });

  socket.on('send_message_success', data => {
    store.dispatch({ type: 'SET_MESSAGE', payload: data.message });
    store.dispatch({ type: 'SET_LATEST_MESSAGE_SUMMARY', payload: data.message });
    console.log('message send_message_success', data);
  });

  socket.on('get_message_success', data => {
    store.dispatch({ type: 'CLEAR_MESSAGE' });
    store.dispatch({ type: 'SET_MESSAGE', payload: data });
    console.log('message get_message_success', data);
  });

  socket.on('message_delivery_status', data => {
    console.log('message message_delivery_status', data);
  });

  socket.on('message_summary_error', data => {
    console.log('message message_summary_error', data);
  });

  socket.on('get_message_error', data => {
    console.log('message get_message_error', data);
  });

  socket.on('send_message_error', data => {
    console.log('message send_message_error', data);
  });

  socket.on(DeliveryStatus.ACCEPTED, data => {
    console.log('message ACCEPTED', data);
  });
  socket.on(DeliveryStatus.DELIVERED, data => {
    console.log('message DELIVERED', data);
  });
  socket.on(DeliveryStatus.FAILED, data => {
    console.log('message FAILED', data);
  });
  socket.on(DeliveryStatus.QUEUED, data => {
    console.log('message QUEUED', data);
  });
  socket.on(DeliveryStatus.RECEIVED, data => {
    console.log('message RECEIVED', data);
  });
  socket.on(DeliveryStatus.RECEIVING, data => {
    console.log('message RECEIVING', data);
  });
  socket.on(DeliveryStatus.SENDING, data => {
    console.log('message SENDING', data);
  });

  socket.on(DeliveryStatus.SENT, data => {
    console.log('message SENT', data);
  });
  socket.on(DeliveryStatus.UNDELIVERED, data => {
    console.log('message UNDELIVERED', data);
  });
};
