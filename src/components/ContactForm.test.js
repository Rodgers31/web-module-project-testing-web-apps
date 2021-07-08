import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
	render(<ContactForm />);
});

test('renders the contact form header', () => {
	//Arrange
	render(<ContactForm />);
	//Act
	const readerHead = screen.getByText(/contact form/i);
	//Act

	//Assert
	expect(readerHead).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm />);
	const firstname = screen.getByLabelText(/first name*/i);
	userEvent.type(firstname, 'Rode');
	const erromessage = await screen.findAllByTestId('error');
	expect(erromessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
	render(<ContactForm />);
	const submit = screen.getByRole('button');
	userEvent.click(submit);
	const errormessage = await screen.queryAllByTestId('error');
	expect(errormessage).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
	render(<ContactForm />);
	const firstname = screen.getByLabelText(/first name*/i);
	userEvent.type(firstname, 'rodgers');
	const name = screen.getByLabelText(/last name*/i);
	userEvent.type(name, 'maximis');

	const button = screen.getByRole('button');
	userEvent.click(button);
	const errormessage = await screen.findAllByTestId('error');
	expect(errormessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);
	const email = screen.getByLabelText(/email*/i);
	userEvent.type(email, 'jonny@');
	const errormessage = await screen.findByText(
		/email must be a valid email address./i
	);
	expect(errormessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);
	const firstname = screen.getByLabelText(/first name*/i);
	userEvent.type(firstname, 'rodgers');
	const lastname = screen.getByLabelText(/last name*/i);
	userEvent.type(lastname, '');
	const email = screen.getByLabelText(/email*/i);
	userEvent.type(email, 'jonny234@yahoo.com');

	const button = screen.getByRole('button');
	userEvent.click(button);
	const errormessage = await screen.findByText(
		/lastName is a required field./i
	);
	expect(errormessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render(<ContactForm />);
	const firstname = screen.getByLabelText(/first name*/i);
	userEvent.type(firstname, 'rodgers');
	const lastname = screen.getByLabelText(/last name*/i);
	userEvent.type(lastname, 'maximus');
	const email = screen.getByLabelText(/email*/i);
	userEvent.type(email, 'jonny234@yahoo.com');
	const message = screen.getByLabelText(/message/i);
	userEvent.type(message, '');

	const button = screen.getByRole('button');
	userEvent.click(button);

	const messagereturn = await screen.queryByTestId('messagereturn');
	expect(messagereturn).toBeNull();
});

test('renders all fields text when all fields are submitted.', async () => {
	render(<ContactForm />);
	const firstname = screen.getByLabelText(/first name*/i);
	userEvent.type(firstname, 'rodgers');
	const lastname = screen.getByLabelText(/last name*/i);
	userEvent.type(lastname, 'maximus');
	const email = screen.getByLabelText(/email*/i);
	userEvent.type(email, 'jonny234@yahoo.com');
	const message = screen.getByLabelText(/message/i);
	userEvent.type(message, 'abcdefg');

	const button = screen.getByRole('button');
	userEvent.click(button);

	const firstNameDisplay = await screen.queryByTestId('firstnameDisplay');
	const lastNameDisplay = await screen.queryByTestId('lastnameDisplay');
	const emailDisplay = await screen.queryByTestId('emailDisplay');
	const messageDisplay = await screen.queryByTestId('messageDisplay');

	expect(firstNameDisplay).toBeInTheDocument();
	expect(lastNameDisplay).toBeInTheDocument();
	expect(emailDisplay).toBeInTheDocument();
	expect(messageDisplay).toBeInTheDocument();
});
