const express = require('express')
const MemberList = require('../models/MembersList')
const {
    createMember,
    getMembers,
    getSingleMember,
    deleteMember,
    updateMember
}   = require('../controllers/MembersListController')

const router = express.Router()

router.get('/', getMembers)
router.get('/:id', getSingleMember)
router.post('/', createMember)
router.delete('/:id', deleteMember)
router.patch('/:id', updateMember)

module.exports = router