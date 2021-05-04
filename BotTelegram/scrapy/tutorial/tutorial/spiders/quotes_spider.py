import scrapy
import time


class QuotesSpider(scrapy.Spider):
    name = "news"
    start_urls = [
        'https://www.incibe.es/protege-tu-empresa/avisos-seguridad/filtro/phishing'
    ]

    def parse(self, response):
        print('\n\n\n _--------------------------')
        
        lastNew = response.xpath('//h2[contains(@class, "node-title")]/@title').extract()[0]
        lastNewLink = response.xpath('//h2[contains(@class, "node-title")]/a/@href').extract()[0]
        lastNewLink = "incibe.es" + lastNewLink
        lastNew = lastNew + " - " + lastNewLink
        print(lastNewLink)
        filename = 'hola.html'
        with open(filename, 'w', encoding='UTF-8') as f:
            f.write(lastNew)
        time.sleep(5)

#response.css('h2.node-title').get()
