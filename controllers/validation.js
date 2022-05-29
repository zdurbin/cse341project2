const { check, validationResult} =require('express-validator');

exports.taskValidation = [
    check('taskName', 'Task name is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('dueDate', 'completion deadline date is required').not().isEmpty(),
    check('taskPriority', 'Task importances is required').not().isEmpty()
];

exports.results = validationResult;
