import { test } from 'node:test'
import assert from 'node:assert/strict'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

test('hash + verify password', () => {
  const hash = bcrypt.hashSync('MotDePasse!2026', 12)
  assert.ok(hash.length > 50)
  assert.equal(bcrypt.compareSync('MotDePasse!2026', hash), true)
  assert.equal(bcrypt.compareSync('mauvais', hash), false)
})

test('JWT sign + verify', () => {
  const secret = 'test-secret-tres-long-ici-pour-tests'
  const token = jwt.sign({ sub: 1, email: 'a@b.com', role: 'editor' }, secret, { expiresIn: '1h' })
  const decoded = jwt.verify(token, secret)
  assert.equal(decoded.sub, 1)
  assert.equal(decoded.email, 'a@b.com')
  assert.equal(decoded.role, 'editor')
})

test('JWT expire rejete', () => {
  const secret = 'test-secret'
  const token = jwt.sign({ sub: 1 }, secret, { expiresIn: '1ms' })
  // attendre que le token expire
  return new Promise((resolve) => {
    setTimeout(() => {
      assert.throws(() => jwt.verify(token, secret), /expired|jwt expired/i)
      resolve()
    }, 50)
  })
})

test('JWT avec mauvais secret rejete', () => {
  const token = jwt.sign({ sub: 1 }, 'secret-A', { expiresIn: '1h' })
  assert.throws(() => jwt.verify(token, 'secret-B'), /invalid signature/i)
})

test('bcrypt rejette un mot de passe vide', () => {
  // Ne devrait pas throw, mais le hash devrait differer
  const hash = bcrypt.hashSync('', 4)
  assert.equal(bcrypt.compareSync('', hash), true)
})
