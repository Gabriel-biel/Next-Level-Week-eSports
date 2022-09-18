import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hours-string';

const app = express();
app.use(express.json())

app.use(cors({
  
}))

const prisma = new PrismaClient();

//HTTP methods / API RESTful / HTTP codes

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games);
});

app.get('/games/:id/ads', async (request, response)=> {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlayning: true,
      hoursEnd: true,
      hoursStart: true
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHoursString(ad.hoursStart),
      hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
    }
  }));
});

app.post('/game/:id/ads', async(request, response) => {
  const gameId = request.params.id
  const body = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlayning: body.yearsPlayning,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHoursStringToMinutes(body.hoursStart),
      hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })


  return response.status(201).json(ad);
});


app.get('/ads/:id/discord', async(request, response)=> {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId
    }
  }
  )

  return response.status(200).json({
    discord: ad.discord
  });
});

app.listen(3333);