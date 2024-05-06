import http from 'node:http'
import { AddressInfo } from 'node:net'
import express, { Router } from 'express'
import cors from 'cors'

interface Options {
    port: number
    routes: Router
}

export class Server {
    private app = express()
    private readonly port: number
    private readonly routes: Router
    private httpServer?: http.Server

    constructor(opt: Options) {
        const { port, routes } = opt
        this.port = port
        this.routes = routes
    }

    public start(): Promise<void> {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(this.routes)

        return new Promise((resolve) => {
            this.httpServer = this.app.listen(this.port, () => {
                const { port } = this.httpServer?.address() as AddressInfo
                // eslint-disable-next-line no-console
                console.log('Server listen on port: ', port)
                resolve()
            })
        })
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close(error => {
                    if (error) return reject(error)
                    return resolve()
                })
            }
            return resolve()
        })
    }

    getHttpServer(): http.Server | undefined {
        return this.httpServer
    }
}