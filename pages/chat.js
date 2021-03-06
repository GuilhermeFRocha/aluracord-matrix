import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router'
import { createClient } from '@supabase/supabase-js'
import {ButtonSendSticker} from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMjA5MiwiZXhwIjoxOTU4ODg4MDkyfQ.Q809INI7jNKlMo_747IoVJH9avKlnuLfyEuE_urSqJs'
const SUPABASE_URL = 'https://xitqyajrsqjfkgtusveq.supabase.co'
const suparbaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return suparbaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
      
    })
    .subscribe();
  }

export default function ChatPage() {

    suparbaseClient
    .from('mensagens')
    .select('*')
    .then((dados) => {
      console.log('Dados da consulta:', dados);
    });

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        suparbaseClient
          .from('mensagens')
          .select('*')
          .order('id', {ascending: false })
          .then(({ data }) => {
            setListaDeMensagens(data);
              });
    
              const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
                console.log('Nova mensagem:', novaMensagem);
                console.log('listaDeMensagens:', listaDeMensagens);
                // Quero reusar um valor de referencia (objeto/array) 
                // Passar uma função pro setState
          
                // setListaDeMensagens([
                //     novaMensagem,
                //     ...listaDeMensagens
                // ])
                setListaDeMensagens((valorAtualDaLista) => {
                  console.log('valorAtualDaLista:', valorAtualDaLista);
                  return [
                    novaMensagem,
                    ...valorAtualDaLista,
                  ]
                });
              });
          
              return () => {
                subscription.unsubscribe();
              }
            }, []);

    function handleNovaMensagem (novaMensagem){
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        suparbaseClient.from('mensagens').insert([mensagem])
        .then(({ data }) => {
            

        })

        setMensagem('');
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/340/622/464/naruto-shippuuden-akatsuki-silhouette-zetsu-wallpaper-thumb.jpg)`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
              
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '10px',
                    border: '3px solid black ',

                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    backgroundColor: 'rgba(0, 0, 0, 0.50)',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        border: '3px solid red',
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        padding: '16px',
                        backgroundColor: 'rgba(0, 0, 0, 0.30)',
                        borderRadius:'15px'
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                                <li key={mensagemAtual.id}>
                                    {mensagemAtual.de}: {mensagemAtual.texto}
                                </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                               const valor = event.target.value
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                   handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                backgroundColor: 'black',
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: 'black',
                                marginRight: '12px',
                                color: 'white',
                            }}
                        />
                        <ButtonSendSticker
                         onStickerClick={(sticker) => {
                                handleNovaMensagem(`:sticker: ${sticker}`);
                        }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color:'black', fontSize:'18px !important' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
  
    return (
        <Box
            tag="ul"
            styleSheet={{
             
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
            }}
        >
            {props.mensagens.map (()=>{
                
            })}

{props.mensagens.map ((mensagem)=>{
    return (
        <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                    
                </Box>
                {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )
                        }
            </Text>
    )
})}
            
        </Box>
    )
}