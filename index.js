
import express from 'express'
import pg from 'pg'
import Joi from 'joi'

const app = express()
const port = 3000
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'btg280406',
    port: 5432,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware logging
app.use((req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
        })
    })

    next()
})

// Response sukses
function successResponse(res, message, data, status = 200) {
    return res.status(status).json({
        status: 'success',
        message,
        data,
        error: null,
    })
}

// Response error
function errorResponse(res, message, status, detail = null) {
    return res.status(status).json({
        status: false,
        message,
        data: null,
        error: detail,
    })
}

// Schema validasi biodata
const biodataSchema = Joi.object({
    id: Joi.number().integer().positive(),
    nama: Joi.string().trim().min(2).max(100).required(),
    nim: Joi.string().trim().min(5).max(20).required(),
    kelas: Joi.string().trim().min(1).max(20).required(),
})


const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
})


