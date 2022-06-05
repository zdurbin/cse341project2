const { check, validationResult} = require('express-validator');

exports.taskValidation = [
    check('taskName', 'Task name is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('dueDate', 'completion deadline date is required').not().isEmpty(),
    check('taskPriority', 'Task importances is required').not().isEmpty()
];

exports.results = validationResult;

exports.userValidation = [
    check('userFirstName', 'The user name is required').not().isEmpty(),
    check('userLastName', 'The user name is required').not().isEmpty(),
    check('userEmail', 'The user email is required').not().isEmpty(),
    check('userBirthdate', 'The user birthdate is required').not().isEmpty(),
    check('userPosition', 'The users job position is required').not().isEmpty(),
    check('userEmploymentStatus', 'The users employment status is required').not().isEmpty(),
    check('userTodoPromissions', 'The users promissions are required').not().isEmpty(),
];

exports.results = validationResult;
