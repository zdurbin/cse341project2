const { check, validationResult} = require('express-validator');

exports.taskValidation = [
    check('Name', 'Task name is required').not().isEmpty(),
    check('createdDate', 'Start date is required').not().isEmpty(),
    check('due', 'completion deadline date is required').not().isEmpty(),
    check('priorityLevel', 'Task importances is required').not().isEmpty(),
    check('creator', 'creators name is required').not().isEmpty(),
    check('responsable', 'Task responsablitly is required').not().isEmpty(),
    check('discription', 'Task description is required').not().isEmpty()
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
