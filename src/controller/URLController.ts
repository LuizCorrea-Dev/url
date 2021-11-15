import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

export class URLController {
	public async shorten(req: Request, response: Response): Promise<void> {
		const { originURL } = req.body

		// verificando de url existe
		const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}

		// criando o hask pra essa URL
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
	
		// salva a URL no babco de dados
		const newURL = await URLModel.create({ hash, shortURL, originURL })

		// Retorna a URL que foi salva
		response.json(newURL)
	}

	public async redirect(req: Request, response: Response): Promise<void> {
		// pega a hash da URL
		const { hash } = req.params
		const url = await URLModel.findOne({ hash })

		// encontra a URL pelo hash
		if (url) {
			response.redirect(url.originURL)
			return
		}

		// redireciona pra a URL original a partir da encontrada
		response.status(400).json({ error: 'URL not found' })
	}
}
