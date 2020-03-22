Kuru Anime's Discord Bot
================

### General purpose Discord Bot for Anime Servers

Kuru Anime's Discord Bot is your one-stop bot for Anime servers! It keeps on growing day by day and if there's a feature that you want to be included we'll be glad to help you add it! Our Discord Bot also follows one of Kuru Anime's main core value which is staying open-source!

**Links**
 - [Kuru Anime](https://web.kuru-anime.com/)
 - [Discord Server](http://discord.kuru-anime.com/)
 - [Documentation](https://docs.kuru-anime.com/)

### Running Kuru Anime's Discord Bot yourself

Before you start working on the bot we need to first install some prerequisites.

- An editor of your choice or you can use [Visual Studio Code](https://code.visualstudio.com/Download)
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

It's also worth mentioning that if you don't know that much about JavaScript then you will have a hard time working on the bot. You still can work on the bot but you'll probably have some problems here and there. If you want to know more, here are a few links that [discordjs.guide](https://discordjs.guide/) compiled:

- [CodeCademy's interactive JavaScript course](https://www.codecademy.com/learn/learn-javascript)
- [Eloquent JavaScript, a free online book](http://eloquentjavascript.net/)
- [Nodeschool, for both JavaScript and Node.js lessons](https://nodeschool.io/)
- [MDN's JavaScript guide and full documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Google, your best friend](https://google.com/)

### Checking if they are installed

Test if the prerequisites are installed properly by checking their current versions in your system.

For Yarn:
```
yarn --version
```

For Node.js:
```
node --version
```

For Git
```
git --version
```

They should, in theory, return their versions if they are properly installed.

### Setting up your own application

Once they are all installed we can then proceed to setting up our own server and bot for testing.

It easy! So don't worry.

1. Open up the Discord website and login.
2. Hover over the "Developers" drop-down menu and click on the Developer Portal link.
3. Click on the "New Application" button.
4. Enter a name and optionally select a team (if you want the bot to belong to one). Then confirm the pop-up window by clicking the "Create" button.

You should see a page like this:

![c422fe87](https://discordjs.guide/assets/img/created-bot.c422fe87.png)

Fill in the necessary details and save it. Once you're done you can move on to the next step by clicking on the "Bot" tab on the left pane.

![dff0f01e](https://discordjs.guide/assets/img/create-bot.dff0f01e.png)

Click the "Add Bot" button on the right and confirm the pop-up window by clicking "Yes, do it!". You made it! You've created your own Discord Bot! We're not done yet, though.

### Your token

This is one of the important step on this instruction so please pay close attention.

After creating the bot you'll see a page like this:

![c422fe87](https://discordjs.guide/assets/img/created-bot.c422fe87.png)

In this panel you'll be able to do stuff like, add avatar, set its username or make it public/private. This is also the panel where you can get your bot's token. When you're asked for the bot's token, this is where you'll find it. Just hit copy and you'll have it in your clipboard.

### What's a token, anyway?

Think of it as your bot's password. The bot uses the token to login to Discord. Just like a normal password, you should not share it to anyone. If someone gets a hold of your bot's token they'll be able to do malicious acts with it.

### Adding your bot to servers

If everything's been done correctly you should have a bot application set up and an access to its token. It's missing a server, though, so we need to invite it in one.

You'll need a special link to invite your bot. You'll need its cliend ID to do so.

### Bot invite links

An invite link for a bot looks like this:

```
https://discordapp.com/oauth2/authorize?client_id=123456789012345678&scope=bot
```

Let's break it down:

- The first part is just Discord's standard structure for authorizing an OAuth2 application (such as your bot application) for entry to a Discord server.
- The second part that says `client_id=...` is to specify which application you want to authorize. You'll need to replace this part with your client's ID in order to create a valid invite link.
- Lastly, the third part which says `scope=bot` specifies that you want to add this application as a Discord bot.

A `permissions` parameter also exists to restrict or guarantee the permission your bot will have on the server you are adding it to. For ease of use, it is recommended to use [this](https://discordapi.com/permissions.html) website.

### Creating and using your own invite link

As mentioned above, you'll need to replace the `client_id` parameter with your client's ID in order to generate your invite link. To find your app's ID, head back to the [My Apps](https://discordapp.com/developers/applications/me) page under the "Applications" section once again and click on your bot application.

Insert your app's ID into the link template and then access it in your browser. You should see something like this (with your bot's username and avatar):

![3d267a22](https://discordjs.guide/assets/img/A8l70bj.3d267a22.png)

Choose the server you want to add it to and click "Authorize". Do note that you'll need the "Manage Server" permission on a server in order to be able to add your bot there. This should then present you a nice confirmation message:

![c05e3b60](https://discordjs.guide/assets/img/BAUsjyg.c05e3b60.png)

Congratulations! You've successfully added your bot to your Discord server. It should show up in your server's member list somewhat like this:

![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAC3CAYAAAAsCNNGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABnESURBVHhe7Z35e1RFusfv/3Cf597nzh0VAenusEMSspFAEgkhgRAwG1mABEL2pUNn60530iEhBIMgMHKBAUQYBhFwvW7g4OgYh0EcAdGRUceRccZxxmVAgYv4vfVW9+mc7pyQhWD3Ce95ns/T51TVqar88Ol6q+qczr9NnhoKhmH0CQvMMDqGBWYYHcMCM4yOYYEZRsewwAyjY1hghtExLDDD6BgWmGF0DAvMMDqGBWYYHcMCM4yOYYEZRsewwAyjY1hghtExLDDD6BgWmGF0DAvMMDrG/wIHx2BeZgFylwoyFyIs2LdMFCJj43ulh8xMQHREeJ/XHkT90bGxCPGkhSNsVgIiZ6jKCKZFxGPWzCjv69gEFeo6hsCMWK/6GWY48KvA0+asxGpHGxzWRlSZLbDY2tDiqEV2tLrccphb29FYmoppqnuza0RaSUqf1x6SKtDYWodsT1oKiq3tcFjyEaUql1jigLNmufe10wmbvcVNDTJV5QdMZCqWVTahydnuVT/DDAd+FDgRK+rbfMSMwqLKZrTUFyPOk0YCO2F3OFGZ0TPC3prAraK+NtQVJnrKaQo8HMLFZmNZziKklg9TfQyjwn8Ck1hOIZZvyBy5EpZWO1bNVdJI4Dosy64V0ony7tH51gR2oDi3DA1OO4qTXV8Kt01gN8NdH8MQ/hM4tw5OawUSe+WlosTWDnOucu0SOFvMXRdWNMMuJKDQ95YFTgpF1PJGtIg+JIkvEU2BPSG0A6Vpyv1DgwVmbgf+FdhWiaReeekoc7SKcFm5VgQW58FCbmsbLMvjhkXgyVPjkGtpha0iHUlaAltWeRaxeha9XHNop5iX3xSfLycWmLkd+E/g2GLUtTahMN4nPb4U9c4GLI1U0lQCC6YlV4jQ14q6xuEQWBAt6hfz67p6DYGHUTgWmLkd+HERKwZZZqcIYSsxXxndZiyWI6y9Klu1sOUtMJFYbEeLGOWGRWBBOM2vadRkgRmd4UeBBcHzkGt2CBnb4BBhM31aK/MQ47Ww1Vtgzwq2j8DqENZamurKG4DAtDecVuXsLbCqPmevPgwOFpi5HfhXYAX5sEXvhzUYhrk5gSEwwzBDggVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMQEv8MQpwRg/aRqCJkyFacIUGMdPltA5pVEeldG6l2FGOgEr8IRJ072E7Q/T+CnyHq26GGakEnACT5wcPChxfaF7qQ6tuhlmpBFQAtMIqiXlUJggQmutNhhmJBEwAtNc1ldCQ9CkXmmDYfxElpgZ2QSEwMp8V03QxKkSOieRhyozfTFotckwIwG/C0zzVZLzntHjvLhr1H346T1jMfq+IAQJiUnGoUrMc2JmpOJXgSdNCZFSTgsJR9eGh/Dw5i3YtOlhydqOdSgrr0L07Hjcfe99HnkNJOWEqQL3yKykjReSU7oYtelTprvzabuJ2tLqA8PoGb8KTKHzmHFBCIuIRnf3G3j79Gn8/u3TOPPOO3j//HnJ66+9BpvNLssZgoSoBvE5egwM9xl6RlkSdpzJlX7vaBjG3AejaYJLaLfIvMXEjET8KjDNb8caxmNG+Ey8/NJL+O2bb6KopAyz4+Ygc0muGIk34+Rv38S5s2dgb3bi7rtHwxSdAGPaKhgT0oSYE12j7JixMEbdD2NGCYx5ZhhT8mCYEuqSWZQhiU0CrT4wjJ7xm8A0LyWxSGAagY+9/DLeOnUKyQsW4T9/cg9GjTHgJ3eNlqPvqZMn8YaQOy4qCqNX2hHU/QNMW17GuHFGGExCUMsmmI5+BNMr/4Lp1e9gOvYVTHvfgjG/HgZ3qE1tDW4unI22PUfxxNZajbxQVG8VeXs6kaaRxzA/Fn4TWNk2UgQ+fuwYTv3ud1iclinlnTB5Ou4zTpDlnnn6GZw9dw51leX4aU4NJpy4DOPG5zDu7rthNHch6FdC3Cc/hrHjcZgaHpF5ppf+AdOzF2EIj4PBYJJtDW5FmgVmAh+/CUxbRL4C0wi86IEMuQpNIS+F2HROi1rn33sPmzs7MGpZHca/+i2MXU/BMHEaTPt+D9OLX8C4ygHDPaPk/FfOgTOKYXyg0HVOq9hiFKY2tfqiDQvMBD5+E5jkvJnAJB2tHt81aizWrGmXAu/cvAljCqwIEgKb1h+FMSQKxoPnYXrh7zCmF2HcT/7LtXAlxDaMHede6OoJoalNrb5oMziBw9Ks2LBzH/btP4B9u3dgw9oqJHvKRyChqA1bdou8/Y/ikfVWLI5Q8hagsnMrmpYqdexCW56SxzA3J3AFdgtH+8Fr166TAm/fuAGj8xsxXoTQpoeelYKatp1AkBDY9NhpGPNqYJgcAsO998JgHA8jPZpJi1y3W+BZVjxy6DAe3dIGS20jWtbvwO5dnchyl401b8MvDh/E9vXNIr8Nm/cexuN7Otzyu9r5+abN2C3q+OWeHVJm3/YYRouAFZjyiXvHGrF9x06cf/89dLY04+68WhlCmzaJOfCoUTAmZ8v5r5zzPv85THtOwlj9IAyR98Mweqx7j9jFbRM4oxN7Dh9AV2GERtl8dO47in0bijFdSZPlD+GhErp2tyME31I7v6cMwwyAgBJYWcQiaekdX3oSa1bcHPyu+7c4+9Y7KFiyBHflWVwCb3hGjrIyVI6dDxMtYB350LUC/dI/5blxpc2VTwKLUfi2CRxSjg37D+OJQ4ewe9smtJlzMTPEXXZxB3YfPoqDByh8VjiIgyJtd1uGKONqx0twhhkgAbGIRfvAyjZSYnIK/v0//ls+fRUSFon9e/ejsa0F82sKMHnKBIwrsCGIQmgSeJzRNd+l7aQxYrSdnQxj7WaYfnkOpmf/4lrcWrzStU8s5B3cIlY8Gv6HJO1Aal95O1sxV0mLWIT8pi48Iua5vzx0FI/v/xmq40W6HG2PYmdXowyv1ZRnxYt7XQLvWZutqp9hBobfBFZvI8kHOYTA3W+8gc71D8JcU4uOzvXo7n4TG7Zsxj2VCZi6rQBTqxNhLG6G6ZVLMNIc2BgEgyFI1CNGczHflSKLsJrC5wklrZiYU4lJEbGYNDlY7gEP9pno3PW/EKHtHrSk+OTF27FNSPrY+nzvdJ/8Hc0LxHUNNovznzsX+5SLwHQ5SrPAzNDxm8AkEy0u0SOS4SKE7u7ulo9Snj93Dh/84Q949+wZnH71VygozsfEjnRE7CpDiHMBTPUbpcCmzsMYd9dPYYyaAwM9SnnvaPmFECREnijq1Wpz0LhFfHzvz2AryEJiUgoWFzTLRagnDu1EA42wVG5JKx5ab8GSuXEiDI7AzKx27Dh0GI/U0wgbgaKNB/HEwd1YW7IIYVNjMDttFWwP78MmM93PAjNDx28CEyTcONNEOd9duqwA+QWF8jMvbxkylhZgdusOBDn2YGJhJqbXJmHiiiUw7nhDPrhhXCHmt2GzYHriAxi7noZhbhpMk1UvLCSnIewhJ2btt2LWHgtmVC/BlPBIr/YHwvRUO7bsPyRGYlpocnHw0a1YnapasMpowSOPHcLjnjKHsG+rHSnKPDgkD45tB+S815O/rROFc6kOFpgZOn4VWPkFjnFixKQ5L20ZuRgrGfPgUzB134Bx7zswdj4J4/53XU9d7TnpWphKzYfpqU9cI/JTf8KkmERZ79SSSsQ940Tccy3ePOVA8MKEXv0YCGFxKXIEnhOjtdLsJiJBlpnt2eP1QeYn9yxwMcwt4leB6RU/ZTWaFph6mAYTPeMsQmNT3RYxyr4P0//+FabDYrRd9wQMEXGut49ohTkyHsbGbZhQ1ibrnJKSgdlPt/eW103s4SZMjZrZqy8Mo0f8KjChvNSgxvXgxRQYTBPkXq4xOBLG6EQYZ8QIaQ1SXtf7v6KM+zXCie73fUOrcjTFVRNWntmrHwyjR/wuMKGsSPeWWJzTAhXt99IKM60404hN4op8WUZe0wv7rhXmqAeLNaVVM7OrtFcfGEaPBITABP0AnZbEniep3KE2XXvkdp9TmvKLG1FdJZrSqmGBmZFCwAhMaI3EA0XZ46XVZi1p1YSbecWXGRkElMAEiagsbA0G5V3fKZFRiH3cqikuEXvUjqkzeRGLGRkEnMAKyk/NasmqBf1rFeVe2irSkpcIXuTaamKYkUDACqww1H9uRg9tUKg869FaCZ0P5UEOhglkAl5ghmH6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbH+F/g4BjMyyxA7lJB5kKEBfuWiUJkbAJmqYic4c6bEeuVPis2FiHu+0JmJiA6IlxVjxvRXrSq3OSp4QibparTzbSIeMyaGeV93UdbQ4L6rqqfYYaCXwWeNmclVjva4LA2ospsgcXWhhZHLbKj1eWWw9wqyjhaYLO7qMhy5+XWwelsRZM73WavQab7vuyadjSWpKjqcZNUgcbWOmR70lJQbG2Hw5KPKFW5xBIHnDXLva+dTk8f1G0NishULKtsQpOz3at+hhkKfhQ4ESvq29BYmoppnrQoLKpsRkt9MeI8aSSwA8VJyrUKEthagUTfdMHgBG6FXXyR1BUmesppCjwcwsVmY1nOIqSWD1N9zB2N/wQmkZxCJN+QOXIlLK12rJqrpP0YAov6c8vQ4LSjONkVdt82gd0Md33MnYn/BO5TvlSU2NphzlWufULoytyesj4htCe0FgxaYPEFEbW8ES2iT0niS0VTYE8I7UBpmnL/0GCBmeHAvwLbKpHUKy8dZY5WVGYo1ySwEzVFykLXAoQqZakORx0KKV2QnjjTfc/QBJ48NQ65llbYKtKRpCWwZZVnEatn0cs1h3a29oPPlxULzAwH/hM4thh1rU0ojPdJjy9FvbMBSyOVtB8phFbqjxbtOZyoq9cQeBiFY4GZ4cCPi1gxyDI7RchaifmebaHFKLG2wV6VrVrY+pEFFoRn18JOoyYLzAQ4fhRYEDwPuWYHWuQct1V+WivzEOO1sDV0gdUhrLU01ZU3AIFpbzitytlbYFV9Tq86Bg8LzAwH/hVYQT5cEa/xEAfDMDcjMARmGGZIsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6JuAFjo1LQEZmNkpKylBtNqOxsVFC55SWtSRHltG6l2FGOgEp8LTpYVi0OB21tXWw2+0Dor6+Hg+kZcp7tepkmJFIwAk8NzEZq1dbNCUdCBZLraxDq26GGWkEjMBTxciZlp6FhoZGTTEHA4XY6RlLMD1E41+rMMwIImAEzsld6iVhU1OT59zhcPRKU86VPN98Ynn+Cs22GGakEBAC08jrK6EiZkNDA+rqXHPh5uZmmU6fBKXV1tbK+a/6HrXIGZlLNNtkmJGA3wWm+aoim1o8i8UiQ+GHH34YO3bsgM1mQ01NjUxfvXq1PLdardi1axc2b94sy1KeVl08J2ZGKn4VOCwiBqVl5V7CkZQ04u7fvx8nT57EiRMncOTIEezduxeHDx/G888/jxdeeAFHjx6Vac899xzeeustnDt3DocOHZIjNsmsrpPaoLa0+sDcfqZMC8eivPUodbwJ87oPbhmqZ/GyLlmvVnt3En4V+IG0DCmYAo2yLS0tePfdd/HZZ5/hzJkz+OMf/4hLly6hr+Prr7/GBx98IO/58ssv8dFHH2Ht2rUeiRWoLa0+MLcfkldLxFuF6tVq707CrwIr+7w0UtL8lcLi48ePSzG/+eYb+akcP/zwA27cuCH5/vvv5SelqQ+SmQ4akSnMpjqVUZi2l7T6MGKJTsfihXHaeT8yhQ3HNAW8VaherfbuJPwm8JyEJM/oSJLR6EsLU1999ZVHTEVa+rwZapnp/MqVK+jo6Og1Ct+fME+zL1rE5VlQXWtz0wx7ewcsnmsbSvKSNO/rTTTuT1mISM28wZFW2YnG4jTNvF6kmFFT1nfZnLoH0ej+Wyz2DthtFmTO1i7bF8Ez0zDP829g+0ZLvuFCq707Cb8JnJWV4xGLRkpagHrsscc8EmoJqoVvHo3OdDz99NOeUVhph9rU6kv/pKGozoxkzbz+KESNc6j3ehM6fznS5kVq5vWiX4HtyFFdBy80w9ZUgTmqtP5ILluHmqXaeWq0xBsutNq7k/CbwKuKir0EJtlOnz7tJSGdqw/1dV95itA0d1a2n5QwmtrU6kv/BIbAg2KQAsu/0embdnMGLfCRy5ATo+9v4Lt/XcGJAxfceX/CkQvX8N01kX71Bq5eUvL+gnMayx/fXPiLp06t9u4k/CZwZWWVRy4lfKZFKDoUCemgz08//RRXr171XCt5lHbx4kV5ToeSR1CebxhNbWr1pX/6EjgJ2RXlSO0rbc4KlNSugbPTHX6vUu1Jh85DenG9KyQ3VyI9Xj2yijryqGwCUgpFKK/c90A5Ch5QyogReW4O8sqUOszIUo/OgxU4NB9VLRYs9Erru4+pq0To7dwIp53CcAuy56ju88FL4EuXsUuc216/gqt//adM33Lu//Dd375EV5ernO3Zb/HNte/wjPuaOP434GJ3z7WCVnt3En4TWP2iAo2UW7du9RKQJL5+/boMq2l03rhxo1ykUvJprrxhwwaZR1tO6oUt+qSDtpkoNFfCaGpTqy/905fAWqOWKi00FrMTSlHbWou0hGTEz452lQlNR1FzO8qy5iFYXAfHL0WZuC5aqAhC7dWjqLYd5vw0RIS6615qV414C5BZuBIp8bGyjtC5RahprUeazBP0K3AzllOfiPk5WFnfgpI01aJXP30MnZ2MtKpO1K6kOub19FEDj3AegS+g69RVXPrz30X6RZy5dB3njqjF/Ai/+ccP+PNvetJYYG38LrASPtMeLx2KiHR8+OGHUkCn04nq6mq8+uqrMp2OV155RaZRHpX5+OOPZTrdS3WQyMeOHfOaB//oAkt6h9CRBc1oLF7guZYkVopoodi92EV1bBCy+rwm6SVwb3Lq1qEoxX09iEWs6lonrM5mFGX0tNd/H4cYQt/4AVeuiDD52nX84fifRPqXuIirOK6Skth14bqXsCywNn4PoRWBX3vtNSmdeiSl8JgelaSHO6qqquSDHcrR3d0t6qj0PPhB+8bK6KsITPvI6hF4+EPooQm8pHZtj2ge0lHiaECGPO+jvV4CRyJiXg6yi2jFvBn2zsEI7NNvES7n1a9F6WLXdf99HKLA7hDavONrfE5h8rrPcP7b/8OpR3ukNIsR+sTfeQQeCH5fxCK5SLKzZ89KMRX5FBlpFG1tbcXBgwdx7do1Tx7NcQ8cOCDzaDRWyit10PHJJ5/IJ7OoHWL4F7GGJrDXSOlBfd8ABBYh7grrGqwu6wmjBzcC+/ZbIOp3uO/pv4/DIPD3V/CSOKfR9qqYA3e4y9U9eRlfX+U58EDwm8DqbSR6GYHCZUVCZRRVDmUBiw5FYOVQ59FB82a6n8p8/vnncpFMWYUe/m0kX1m10noLPL+8HZVLeq4ltIjUVI1Eed2/wHFFbWgo9A6xb1Xg4OUONBa59rf77+OthdBXrl7HJ92futK7PsVvPqew+ga+o/D6yjWcelJZoXbBAmvjN4HVD3JQCEyjpSIgyfvee+/JEPjbb7+V6Tc76J4LFy7g7bfflg9xKPLTqrZaYGpTqy/905fAkcitb8fKxJ60mAwLbOtvLvDklGrYGssQ61n4iURsYTMaipQ5Z/8CJ5auhWW5atV5di7KnbcgsLi/rLkZy5SHOfrt4xAE7o+uj7B++4faeX2g1d6dhN8EJpTXAOlz+/btntGURlAKl0+dOiUXt1588UW8//77+OKLL3D58mUpNclJC1e//vWv5csOFEbTM9NKGE2ftDqt7AVTG1p9GBh9CUwPQFTD2tYut4ks1jZYirOQK8575IgT88l1sNXbUF26zLMAFJNTD1uL07WIZF0LmzkfMZ57+hd48uxCmNs6UEf317fC2lCJ3HLbIARWFrHEqOvsRJOtHrk+D4ncvI8CkryV8uuxrFe43UNh4yua8t0qhY3HNdu7k/CrwPQeMI2ONA+mxapNmzbJBzDUB72oYDabpYhUrq2tTUIvPdAeb0VFhVzQUh+0b0xfCDS3JnmpDWpLqw/DgtwuuvlWCm27RIf7pkcjOkErfaBEIiL+Vu4fCP30kf529xxcM19Abw5pCXirUL1a7d1J+FXg8MgYlJWVeySmUZIWnbZt2yZfGSQxOzs75Uoz5VM5Oifo4Q8lbc2aNXj99dflgtfOnTs9K9NKPrVBbWn1gbn98OuEtw+/CkwoL/QrEtM5yUejJ0EyKvn0qQXJTGVpO0oJmRV56Zxf6GdGKn4XmKCfvSHRFOFIPuXnc9TpWvR3T2ZWtmabDDMSCAiBCfoBOkXK4WLFikIRZs3QbI9hRgIBIzD9BCyNxL7v8A4FCrtp5A0J9V5VZZiRRsAIrEDzVf5hd4YZGAEnMMH/WoVhBkZACqyG/7kZw/RNwAvMMEzfsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdAwLzDA6hgVmGB3DAjOMjmGBGUbHsMAMo2NYYIbRMSwww+gYFphhdEso/h8LRuwfbRivUAAAAABJRU5ErkJggg==)
