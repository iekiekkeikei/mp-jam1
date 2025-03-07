ServerEvents.recipes(event => {
    event.shaped(
        Item.of('irons_spellbooks:gold_crown', 1),
        [
            'ABC', 
            'D E', 
            'FGH'  
        ],
        {
            A: 'lost_aether_content:platinum_key', 
            B: 'mythicbotany:mjoellnir', 
            C: 'alexscaves:darkened_apple', 
            D: 'cataclysm:cursium_block', 
            E: 'botania:dice', 
            F: 'blue_skies:runic_arc', 
            G: 'irons_spellbooks:eldritch_manuscript', 
            H: 'cataclysm:ignitium_block'
        }
      )
    console.log('Hello! The recipe event has fired!')
  })
