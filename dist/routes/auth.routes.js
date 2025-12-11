"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password)
        return res.status(400).json({ error: 'email and password are required' });
    try {
        const user = await (0, auth_service_1.login)({ email, password });
        if (!user)
            return res.status(401).json({ error: 'invalid credentials' });
        return res.json(user);
    }
    catch (err) {
        console.error('Login error', err);
        return res.status(500).json({ error: 'internal error' });
    }
});
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!email || !password)
        return res.status(400).json({ error: 'email and password are required' });
    try {
        const user = await (0, auth_service_1.register)({ name, email, password });
        return res.status(201).json(user);
    }
    catch (err) {
        console.error('Register error', err);
        return res.status(400).json({ error: err.message || 'cannot register user' });
    }
});
router.get('/me', auth_1.authenticate, async (req, res) => {
    const userId = req.body.sub;
    if (!userId)
        return res.status(401).json({ error: 'unauthorized' });
    const user = await (0, auth_service_1.getUserData)(userId);
    if (!user)
        return res.status(404).json({ error: 'user not found' });
    return res.status(200).json(user);
});
router.post('/email', async (req, res) => {
    const email = req.body.email;
    if (!email)
        return res.status(400).json({ error: 'expected email in body' });
    const isTaken = await (0, auth_service_1.isEmailTaken)(email);
    return res.status(200).json(isTaken);
});
exports.default = router;
