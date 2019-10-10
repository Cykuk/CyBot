import discord
from discord.ext import commands
import asyncio
from webserver import keep_alive
import os
import random

def get_prefix(client, message):
    with open("prefixes.json", "r") as f:
        prefixes = json.load(f)

    return prefixes[str(message.guild.id)]

client = commands.Bot(command_prefix = '.')

@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.online, activity=discord.Game(".help"))
    print("bot is ready.")

@client.command()
async def ping(ctx):
    await ctx.send(f"Pong! {round(client.latency * 1000)}ms")


@client.command(aliases=["8ball"])
async def _8ball(ctx, *, question):
    responses = ['It is certain.',
                'It is decidedly so.',
                 'Without a doubt.',
                 'Yes - definitely.',
                 'You may rely on it.',
                 'As I see it, yes.',
                 'Most likely.',
                 'Outlook good.',
                 'Yes.',
                 'Signs point to yes.',
                 'Reply hazy, try again',
                 'Ask again later.',
                 'Better not tell you now.',
                 'Cannot predict now.',
                 "Concentrate and ask again.",
                 'Dont count on it',
                 'My reply is no.',
                 'My sources say no.',
                 'Outlook not so good.',
                 'Very doubtful.']
    await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')

@client.command()
@commands.has_permissions(manage_messages=True)
async def clear(ctx, amount=10000):
    await ctx.channel.purge(limit=amount)



@client.command()
async def kick(ctx, member : discord.Member, *, reason=None):
    await member.kick(reason=reason)
    await ctx.send(f"❗Kicked {member.mention}❗")


@client.command()
async def ban(ctx, member : discord.Member, *, reason=None):
    await member.ban(reason=reason)
    await ctx.send(f"❗Banned {member.mention}❗")


client.login(process.env.BOT_TOKEN);
