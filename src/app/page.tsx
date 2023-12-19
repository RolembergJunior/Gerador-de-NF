'use client'


import pdfMaker from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { useEffect, useState } from 'react'

interface ObjectProps{
  name: string,
  price: string,
  description: string
}

export default function Home() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [informations, setInformations] = useState<ObjectProps>({ name:'', price:'', description:''})

  useEffect( () => {
    concatStates()
  }, [name,price,description])

  function concatStates(){
    setInformations({ name: name, price: price, description: description })
  }

  function configurePDF(){
    pdfMaker.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
      {
        alignment: 'center',
        text: 'Nota Fiscal',
        fontSize:20,
        bold: true,
        margin: [15, 20, 0, 45]
      }
    ];

    function Rodape(currentPage: string, pageCount: string){
      return [
        {
          text: currentPage + ' / ' + pageCount,
          alignment: 'right',
          fontSize: 9,
          margin: [0, 10, 20, 0]
        }
      ]
    };

     var docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
      //  content: [details],
        footer: Rodape,
        content: [
          {
            styles: 'tableExample',
            margin: [15, 30, 0, 15],
            table: {
              // widths: ['*', 'auto'],
              body: [
                [
                  { 
                    colSpan: 3,
                    border: [true, true, true, false],
                    fillColor: '#eeeeee',
                    text: 'Chave de Acesso da NFS-e:'
                  },
                  '',
                  '',
                ],
                [
                  {
                    border: [true, false, false, false],
                    fillColor: '#eeeeee',
                    text: 'Número da NFS-e:'
                  },
                  {
                    border: [false, false, false, false],
                    fillColor: '#eeeeee',
                    text: 'Competência da NFS-e:'
                  },
                  {
                    border: [false, false, true, false],
                    fillColor: '#eeeeee',
                    text: 'Data e Hora da emissão da NFS-e:'
                  }
                ],
                [
                  {
                    border: [true, false, false, true],
                    fillColor: '#eeeeee',
                    text: 'Número da DPS:'
                  },
                  {
                    border: [false, false, false, true],
                    fillColor: '#eeeeee',
                    text: 'Série da DPS:'
                  },
                  {
                    border: [false, false, true, true],
                    fillColor: '#eeeeee',
                    text: 'Data e Hora da emissão da DPS:'
                  }
             
                ]   
              ],
            },    
          },
          {
            text: `Eu, ${informations.name}, portador do CPF ${informations.price}, declaro que realizei uma prestação de serviço para a empresa Juninho ltda., portadora CNPJ 89.232.249/0001-36, onde o serviço realizado foi ${informations.description} no valor total de R$ ${informations.price},00`,
            style: 'text'
          },
          {
            styles: 'tableExample',
            margin: [15, 30, 0, 15],
            table: {
              // widths: ['*', 'auto'],
              body: [
                [
                  { 
                    border: [true, true, true, false],
                    fillColor: '#eeeeee',
                    text: 'EMITENTE DA NFS-e:'
                  },
                  { 
                    border: [false, true, false, false],
                    fillColor: '#eeeeee',
                    text: 'CNPJ / CPF / NIF:'
                  },
                  { 
                    border: [false, true, false, false],
                    fillColor: '#eeeeee',
                    text: 'Inscrição Municipa:'
                  },
                  { 
                    border: [false, true, true, false],
                    fillColor: '#eeeeee',
                    text: 'Telefone:'
                  },
                ],
                [
                  {
                    colSpan: 2,
                    border: [true, false, false, false],
                    fillColor: '#eeeeee',
                    text: 'Nome / Nome Empresarial:'
                  },
                  '',
                  {
                    colSpan: 2,
                    border: [false, false, true, false],
                    fillColor: '#eeeeee',
                    text: 'E-mail:'
                  },
                  '',
                ],
                [
                  {
                    colSpan: 2,
                    border: [true, false, false, false],
                    fillColor: '#eeeeee',
                    text: 'Endereço:           '
                  },
                  '',
                  {
                    border: [false, false, false, false],
                    fillColor: '#eeeeee',
                    text: 'Município:         '
                  },
                  {
                    border: [false, false, true, false],
                    fillColor: '#eeeeee',
                    text: 'CEP:             '
                  }
             
                ],
                [
                  {
                    colSpan: 2,
                    border: [true, false, false, true],
                    fillColor: '#eeeeee',
                    text: 'imples Nacional na Data de Competência:'
                  },
                  '',
                  {
                    colSpan: 2,
                    border: [false, false, true, true],
                    fillColor: '#eeeeee',
                    text: 'Regime de Apuração Tributária pelo SN:'
                  },
                  '',
                ],
              ],
            },    
          },
          {
            margin: [15, 20, 0, 15],
            text: 'SERVIÇO PRESTADO',
            style: 'text'
          },
          {
            margin: [15, 30, 0, 15],
            table: {
            // widths: ['*', 'auto'],
            body: [
              [
                { 
                  border: [true, true, false, false],
                  fillColor: '#eeeeee',
                  text: 'Código de Tributação Nacional:'
                },
                { 
                  border: [false, true, false, false],
                  fillColor: '#eeeeee',
                  text: 'Local da Prestação:'
                },
                { 
                  border: [false, true, true, false],
                  fillColor: '#eeeeee',
                  text: 'País da Prestação:'
                },
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, false, true],
                  fillColor: '#eeeeee',
                  text: `Descrição do Serviço: ${informations.description}` 
                },
                '',
                {
                  border: [false, false, true, true],
                  fillColor: '#eeeeee',
                  text: `Valor do serviço: ${informations.price}` 
                }
              ],
            ],
        styles: {
          header: {
            alignment: 'center',
            fontSize: 18,
            bold: true
          },
          subheader: {
            alignment: 'center',
            fontSize: 15,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          },
          tableExample: {
            margin: [0, 5, 0, 15],
            alignment: 'center',
          },
        },
      },
    },
  ]}

    pdfMaker.createPdf(docDefinitions).download()
  }

  return (
    <main >
        <div>
          <img className="m-auto mt-3" src="./Gov.br_logo.svg.png" alt="Logo da empresa" width={300} height={500}/>
          <div className="bg-slate-400 w-[80%] h-[780px] m-auto mt-20 mb-20 p-10">
            <h1 className=" text-5xl text-center">Gere sua Nota!</h1>
            <div className="bg-slate-300 p-10 mt-9">
              <div className="flex">
                <div className="flex flex-col w-[60%]">
                  <label className="m-2"> NOME DO PAGADOR </label>
                  <input onChange={(e) => setName(e.target.value)} className="m-2 h-10 p-2" value={name} type="text" placeholder="Rolemberg Junior"/>
                </div>
                <div className="flex flex-col w-[32%]">
                  <label className="m-2"> VALOR DO SERVIÇO PRESTADO </label>
                  <input onChange={(e) => setPrice(e.target.value)} className="m-2 h-10 p-2" value={price} type="number" placeholder="R$100,00"/>
                </div>
              </div>
              <div className=" flex flex-col mt-8">
                <label className="m-2"> DESCRIÇÃO DO SERVIÇO PRESTADO </label>
                <input onChange={(e) => setDescription(e.target.value)} className="block m-2 w-[91%] h-[300px] p-2 top-1" type="text" value={description} placeholder="Prestei serviços de análise e desenvolvimento de sistemas"/>
              </div>
            </div>
              <div className="flex gap-3 justify-end p-4">
                <button className="bg-red-500 text-white w-[150px] h-[50px] rounded-lg">Limpar</button>
                <button onClick={() => configurePDF()} className="bg-green-500 w-[150px] h-[50px] rounded-lg">Gerar - PDF</button>
              </div>
          </div>
        </div>
    </main>
  )
}
