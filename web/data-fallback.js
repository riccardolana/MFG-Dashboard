// Bundled fallback data for the Strategy Map.
// Used when GET /api/strategy is unreachable: the standalone v3/demo build (which inlines
// this file and drops boot.js), and opening web/index.html without the server.
//
// GENERATED from server/app/data/loader.py — the exact payload GET /api/strategy returns
// (strategy + valueTree + timeline). Do not hand-edit; regenerate after any data change
// (see CLAUDE.md). boot.js sets these same names on window from the live API.

const strategyData = {
  "phases": [
    {
      "id": "discover",
      "title": "Discover",
      "subtitle": "Insight & Strategy",
      "accent": "#4285f4",
      "summary": "Frame the strategic context, align on the brief, and turn workshop inputs into confident direction before development begins.",
      "signal": "From ambiguity to aligned intent",
      "subphases": [
        {
          "id": "strategic-direction",
          "title": "Strategic Direction",
          "summary": "This phase transforms a marketing brief into a confirmed strategic direction with clear creative and media implications. It begins with brief intake and alignment — calibrating expectations on KPIs, audiences, budgets, and timelines — then moves into deep contextual research across the 5Cs (Consumer, Category, Comms, Company, Culture) to surface tensions, signals, and opportunities that aren't immediately obvious. These findings feed a collaborative strategy sprint with the client: hypotheses are presented, strategic territories explored, and priorities defined together. The phase culminates in pressure-testing the chosen direction against media realities (measurability, channel constraints, best practices) and producing a communications framework — insight, hook, and platform — that bridges creative ambition to execution feasibility. A creative wishlist formalises the production requirements that flow into downstream asset tracking and briefing.",
          "milestone": "This phase transforms a marketing brief into a confirmed strategic direction with clear creative and media implications. It begins with brief intake and alignment — calibrating expectations on KPIs, audiences, budgets, and timelines — then moves into deep contextual research across the 5Cs (Consumer, Category, Comms, Company, Culture) to surface tensions, signals, and opportunities that aren't immediately obvious. These findings feed a collaborative strategy sprint with the client: hypotheses are presented, strategic territories explored, and priorities defined together. The phase culminates in pressure-testing the chosen direction against media realities (measurability, channel constraints, best practices) and producing a communications framework — insight, hook, and platform — that bridges creative ambition to execution feasibility. A creative wishlist formalises the production requirements that flow into downstream asset tracking and briefing.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-1-1",
                "number": "1.1",
                "title": "Marketing Brief Intake",
                "summary": "Receive, interpret, and align on the marketing brief from Google Media Lab. Ensure expectations between Google and WPP Media are calibrated before work begins. The brief sets the frame.",
                "status": "Sample complete",
                "owner": "Strategy, Planning, Analytics",
                "effort": "High leverage",
                "sections": {
                  "coreActivities": [
                    "Receive marketing brief from Media Lab",
                    "Review for completeness (KPIs, audience, budget, timelines)",
                    "Identify gaps and formulate clarifying questions",
                    "Align internally (Strategy, Planning, Analytics) on interpretation",
                    "Challenge or negotiate brief assumptions where appropriate"
                  ],
                  "inputs": [
                    "Marketing brief from Google Media Lab",
                    "OBP outputs (budget + channel recommendations)",
                    "Product Area context (PA priorities, tier classification)",
                    "Historical campaign context"
                  ],
                  "outputs": [
                    "Confirmed brief with aligned expectations",
                    "Identified gaps flagged for resolution",
                    "Internal alignment on scope and ambition"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Email",
                        "Google Docs",
                        "Meetings"
                      ],
                      "agents": [
                        "Brand Brief Buster",
                        "SLA & Blueprint Navigator",
                        "DR: Unpack the Brief",
                        "Brief Responder"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "Marketing Brief Agent: Living brief agent that collects brief-related conversations across channels into a single source of truth"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  },
                  "valueDriver": {
                    "theme": "Effectiveness",
                    "quality": "Quality",
                    "statement": "Quality of brief interpretation determines whether downstream work solves the right problem."
                  },
                  "coreProblem": "Google does not always provide a sufficient brief; briefs sometimes arrive with tactical-level decisions already made before strategy work begins. Time spent renegotiating or working from incomplete information diverts capacity from strategic thinking."
                }
              },
              {
                "id": "jtbd-1-2",
                "number": "1.2",
                "title": "Contextual Research & Exploration",
                "summary": "Deep discovery research across consumer, category, competitors, company, and culture (5Cs). The \"homework\" that feeds strategic hypotheses. This is detective work, reading data, cross-referencing, finding tensions and opportunities that aren't obvious.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Deep dive into 5Cs (Consumer, Category, Comms, Company, Culture)",
                    "Cross-reference multiple data sources to identify patterns",
                    "Identify signals, tensions, and opportunities",
                    "Prepare material for client discovery workshop (Strat Sprint)"
                  ],
                  "inputs": [
                    "5Cs data sources (competitive & company intel, brand tracking, cultural signals)",
                    "Past campaign learnings",
                    "Social listening outputs",
                    "Channel-level insights",
                    "Category/brand performance data (BAV, Forrester, etc.)",
                    "3rd party audience data"
                  ],
                  "outputs": [
                    "Content for client discovery workshops (canvas, deck)",
                    "Identified signals and tensions",
                    "Initial hypotheses for discussion"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic insights",
                        "Audience insights",
                        "Desk research (Gemini, eMarketer, Comscore) etc.",
                        "Category Strength BAV (WPP)",
                        "Thought leadership providers (Forrester, etc.)",
                        "3rd party audience platforms",
                        "Google Sheets (meta-database)",
                        "Past Campaign learnings",
                        "Brand performance",
                        "Social listening",
                        "Channel level insights",
                        "Cultural level insights",
                        "3rd competitive analysis"
                      ],
                      "agents": [
                        "Brand Brief Buster",
                        "Strategy Weaver",
                        "SLA & Blueprint Navigator",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "DR: Unpack the Brief",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Brief Responder",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics",
                        "Insights Shatterer",
                        "Cultural Reflex"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Competitive Analysis Tool (MEOW)"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Additional data source integrations"
                      ],
                      "agents": [
                        "Social Intelligence module (OMS)",
                        "Burson integration"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-3",
                "number": "1.3",
                "title": "Define & Refine Hypotheses (Strat Sprint)",
                "summary": "Collaborative workshops with Google to present research findings, discuss hypotheses, explore strategic territories, and align on directions to pursue. This is where MFG's strategic value is most visible to the client.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Conduct workshop(s) to review and discuss hypotheses",
                    "Present contextual research findings",
                    "Explore different strategic territories and \"ways in\"",
                    "Define priorities collaboratively with client",
                    "Incorporate client 1st party data and business context",
                    "Dual sharing exercise"
                  ],
                  "inputs": [
                    "Contextual research outputs",
                    "Client-provided 1st party data and business context",
                    "Client perspective and strategic priorities"
                  ],
                  "outputs": [
                    "Alignment with client on strategic direction(s) to pursue",
                    "Workshop outputs (territories, hypotheses ranked)",
                    "Foundation for V1 of 13-slide deck"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Canvas",
                        "Project pinboard",
                        "Google Slides",
                        "Project workflow"
                      ],
                      "agents": [
                        "Strategy Weaver",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics",
                        "Synthetic Focus Groups",
                        "How might we agent",
                        "Creative Director agent",
                        "Planner agent",
                        "Strategy agent",
                        "Market specifics agent",
                        "Ideas Explorer",
                        "Get To By Guy"
                      ]
                    },
                    "near": {
                      "tools": [
                        "G-Drive integration for agents"
                      ],
                      "agents": [
                        "IDEA: Strategy Orchestrator agent (coordinates multiple specialist agents)"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": [
                        "IDEA: Choreograph Orchestrator Agent"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-4",
                "number": "1.4",
                "title": "Align with Client on Strategic Direction",
                "summary": "Incorporate feedback, pressure-test strategic direction against media realities (measurability, growth potential, best practices), and land on a communications framework. Bridges strategy to media — ensuring the creative idea can be executed and measured.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Incorporate inter-workshop feedback",
                    "Pressure test direction against Planning best practices and channel realities",
                    "Align strategic direction with media measurability",
                    "Derive implications for media and creative",
                    "Produce Insight → Hook → Platform framework"
                  ],
                  "inputs": [
                    "Workshop outcomes and client feedback",
                    "Planning best practices and constraints",
                    "Media reality inputs (measurability, channel viability, budget constraints)"
                  ],
                  "outputs": [
                    "Communications framework (Insight → Hook → Platform)",
                    "V1 of 13-slide deck",
                    "Strategic approach with media implications",
                    "Executive summary for Google SLT"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Google Slides",
                        "Google Docs"
                      ],
                      "agents": [
                        "Sense Check Agent",
                        "Brand Brief Buster",
                        "Strategy Weaver",
                        "SLA & Blueprint Navigator",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "DR: Unpack the Brief",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Brief Responder",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-5",
                "number": "1.5",
                "title": "Create Creative Wishlist",
                "summary": "Aligning on the initial set of platforms and creatives we require to brief in the creative agencies.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Line by line breakdown of what channels, platforms, type of assets, number of assets, creative rotations, length/size, will be required."
                  ],
                  "inputs": [
                    "Creative Wishlist Template",
                    "JTBD 1.4"
                  ],
                  "outputs": [
                    "Creative Wishlist completed"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Creative Wishlist Template (Google Sheets)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Creative Analytics/Library"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Connected Research Infrastructure",
                  "description": "Strategists currently pull from 10+ disconnected sources per sprint (BAV, Choreograph, social listening, Forrester, channel-level insights, eMarketer, Comscore, 3rd-party audience tools, past campaign data), assembling individual meta-databases in spreadsheets each time. Audience profiles must be rebuilt per platform with no persistence across sprints. Opportunity identified to create a persistent 5C intelligence layer that eliminates per-sprint manual assembly, enables cross-source triangulation by default, and carries audience definitions forward — recovering capacity currently absorbed by data mechanics rather than strategic thinking."
                },
                {
                  "title": "Institutional Strategy Memory",
                  "description": "Each strategy sprint starts without structured access to what was decided in previous sprints, what hypotheses were tested, or what strategic territories were explored and discarded. Synthesis is manual and context is lost between engagements. Opportunity identified to build a persistent knowledge layer (via G-Drive integration and orchestrator agents) that surfaces relevant historical decisions, past sprint outputs, and category precedents at the point of need — so each sprint builds on prior thinking rather than rebuilding from scratch."
                },
                {
                  "title": "Automated Strategy-to-Production Handoff",
                  "description": "The creative wishlist is currently a Google Sheet that must be manually populated and then manually transferred into the asset tracker downstream. Changes to the wishlist during the strategy phase don't automatically cascade. Opportunity identified to connect the creative wishlist output directly to downstream asset tracking (via Creative Analytics Library integration), so that channel/format/rotation requirements flow automatically into production briefing without re-entry."
                },
                {
                  "title": "Growth Opportunity Surfacing",
                  "description": "The current process relies on manual synthesis to identify where growth potential lies, without systematic access to historical category launch data or competitive base layers. Opportunity identified to introduce an agent capability that proactively highlights growth white space by cross-referencing contextual research findings with historical campaign performance and category benchmarks — providing strategists a base layer to work from rather than starting from a blank canvas. Shared opportunities to unlock together:"
                },
                {
                  "title": "Brief Calibration & Completeness",
                  "description": "Briefs sometimes arrive with tactical-level decisions pre-baked (e.g., channel selections, format choices) before strategy work begins, or with gaps in KPIs, audience definition, or budget parameters. Time spent re-negotiating scope or working from incomplete information diverts strategic capacity on both sides. Opportunity identified to co-develop a shared brief completeness framework that separates strategic intent from tactical prescription — ensuring MFG receives the \"why\" clearly, while Google retains flexibility on the \"how\" until strategy work validates direction."
                },
                {
                  "title": "First-Party Data Access in Strategy Sprints",
                  "description": "The strategy sprint is where MFG's strategic value is most visible, and Google's 1st-party data (business context, product usage, audience behaviour) is a critical input for grounding hypotheses in reality. Currently, this data arrives variably — sometimes rich, sometimes limited. Opportunity identified to establish a structured data-sharing protocol ahead of each sprint, defining what 1PD Google will bring (and in what format) so that hypothesis development is grounded in shared intelligence from the outset rather than supplemented retroactively."
                },
                {
                  "title": "Campaign Understanding Prior to Brief",
                  "description": "MFG's ability to prepare meaningful research and sharpen hypotheses before the sprint depends on early signals about campaign intent, product priorities, and market focus. Opportunity identified to create a pre-brief signalling mechanism (potentially via the Living Brief Agent concept) where emerging campaign context — even informal or evolving — is captured progressively, giving MFG a head start on contextual research and reducing the compressed timeline between brief receipt and workshop delivery.."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Strategic Insights",
              "Audience Insights",
              "NMI (Nielsen Media Impact)",
              "BAV (Brand Asset Valuator)",
              "GWI",
              "Pathmatics",
              "Charm",
              "Sightly / Culture Replay",
              "Comscore",
              "eMarketer",
              "Forrester",
              "OBP / OBP Lite",
              "SEMRush",
              "Google Trends",
              "Brand Brief Buster",
              "Strategy Weaver",
              "SLA & Blueprint Navigator",
              "SWOT Analysis",
              "Comms Strategy GPS",
              "Baby Strategist",
              "DR: Unpack the Brief",
              "Strat Sprint Showrunner",
              "Audience Personas",
              "Brief Responder",
              "Strategic Signals",
              "Behavioral Science",
              "Brand Analytics",
              "Synthetic Focus Groups",
              "How Might We",
              "Creative Director",
              "Planner",
              "Market Specifics"
            ],
            "valueCreation": []
          }
        },
        {
          "id": "long-range-planning",
          "title": "Long Range Planning",
          "summary": "Long-Range Planning is the comprehensive annual exercise that should determine channels, audiences, and flighting for the entire year at PA + market level. It synthesises seven planning ingredients: audience delivery, competitive pressure, product insights, brand creative direction, social conversation, historical learnings, and cross-PA knowledge into a ranked list of implications and scenario plans.",
          "milestone": "Long-Range Planning is the comprehensive annual exercise that should determine channels, audiences, and flighting for the entire year at PA + market level. It synthesises seven planning ingredients: audience delivery, competitive pressure, product insights, brand creative direction, social conversation, historical learnings, and cross-PA knowledge into a ranked list of implications and scenario plans.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-1-6",
                "number": "1.6",
                "title": "Long-Range Planning (Annual)",
                "summary": "",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Comprehensive annual planning exercise across 7 key ingredients to produce prioritized implications and scenario plans. The strategic backbone determines the year's media strategy at PA + market level."
                  ],
                  "inputs": [
                    "Analyze 7 planning ingredients (1.5a–1.5g below)",
                    "Synthesize findings into ranked list of implications",
                    "Build scenario plans addressing top-priority implications",
                    "Align with Google on priority implications",
                    "Produce annual lay-down (channels, audiences, flighting)",
                    "Determine domains/partnership opportunities"
                  ],
                  "outputs": [
                    "POV on how plan should evolve: channels, audiences, flighting",
                    "Ranked list of 10-15 implications",
                    "Multiple scenario plans",
                    "Annual media lay-down with audience composition targets"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic insights",
                        "Audience insights",
                        "Google Sheets",
                        "NMI (US only)",
                        "Scenario plan with outputs + HLL that analysis live in CS"
                      ],
                      "agents": [
                        "Strategy Weaver",
                        "SLA & Blueprint Navigator",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Audience Delivery",
                        "Audience Strategy Insight",
                        "Competitive Analysis",
                        "Campaign Strategies (non-targeted reach KPI - DTS)",
                        "Historic PCA Reports",
                        "G-Drive knowledge integration",
                        "Gemini meeting notes knowledge base",
                        "Campaign Tactics finalize API Connections"
                      ],
                      "agents": [
                        "HBR Knowledge Agent",
                        "PA-level Historical Data Agent",
                        "Competitive Analysis Agent (Charm + Meow + Strategic Insights combined)",
                        "Meeting Notes Knowledge Base Agent",
                        "Agent to validate campaign tactics vs. current state outputs"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Product Insights",
                        "Social Listening for Product Usage",
                        "Campaign Strategies non-targeted reach report (NMI)",
                        "Campaign Performance (historical data integration)",
                        "Scenario building capability within Campaign Strategies"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6a",
                "number": "1.6a",
                "title": "Audience Delivery Analysis",
                "summary": "Analyze historical audience delivery to identify where plans over/under-delivered against composition targets. Answers: \"Are we reaching the right people in the right proportions?\"",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Review previous plan makeup and delivery",
                    "Analyze composition gaps (male/female, age, HHI, geo, multicultural)",
                    "Validate against post-buy reporting",
                    "Identify areas of opportunity for audience calibration"
                  ],
                  "inputs": [
                    "Previous media plan",
                    "Demo delivery data (historical)",
                    "NMI (US only currently)"
                  ],
                  "outputs": [
                    "Audience composition analysis (1-pager per PA/market)",
                    "Areas of opportunity for next plan"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "NMI (US only)",
                        "Google Sheets"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "OMS Campaign Strategy (Pilot: non-targeted reach report)"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "OMS Campaign Strategy (Global Rollout)"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6b",
                "number": "1.6b",
                "title": "Competitive Analysis",
                "summary": "Understand competitive pressure: how campaigns stack against competitors by channel, spend, and SOV. Identify overlap, white space, and opportunities.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Pull competitive spend and SOV data",
                    "Compare historical pressure at channel level",
                    "Identify overlap and white space opportunities",
                    "Project future competitive landscape"
                  ],
                  "inputs": [
                    "Historical competitive data",
                    "Competitor lists (client-provided + MFG-identified)",
                    "3rd party competitive tools"
                  ],
                  "outputs": [
                    "Competitive stacking analysis (1-pager per PA/market)",
                    "White space opportunities",
                    "Competitive pressure projections"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic Insights",
                        "Audience Insights",
                        "Pathmatics",
                        "Charm",
                        "Google Sheets",
                        "Platform/publisher outputs",
                        "Google Trends"
                      ],
                      "agents": [
                        "Strategy Weaver",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Strategic Signals",
                        "Brand Analytics"
                      ]
                    },
                    "near": {
                      "tools": [
                        "SEMRush",
                        "Statcounter"
                      ],
                      "agents": [
                        "Competitive Analysis Agent (Charm + Meow + Strategic Insights combined into Open)"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Competitive APP R&I + MFG"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6c",
                "number": "1.6c",
                "title": "Product Insights",
                "summary": "Leverage Google's 1st party data on product usage, market penetration, and funnel metrics to inform audience and channel strategy.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Receive and analyze Google 1st party product data",
                    "Identify usage patterns, over/under-indexing audiences",
                    "Map product KPIs to media strategy implications"
                  ],
                  "inputs": [
                    "Google-provided 1st party data (slide deck format)",
                    "Market insights and penetration data"
                  ],
                  "outputs": [
                    "Product insight analysis (1-pager per PA/market)",
                    "KPI focus recommendations for media"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Slide decks from Google"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "OI (Open Intelligence)",
                        "Beacons for 1PD matching"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6d",
                "number": "1.6d",
                "title": "Brand Creative Direction",
                "summary": "Determine the comms strategy direction: how should the brand behave and message? Translates the Strat Sprint insight/hook/platform into media behavior implications.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Define strategic direction of travel for messaging",
                    "Determine brand behavior implications for media",
                    "Assess creative competitive landscape",
                    "Connect to media reality"
                  ],
                  "inputs": [
                    "Strat Sprint outputs (insight, hook, platform)",
                    "Creative competitive landscape",
                    "Brand positioning requirements"
                  ],
                  "outputs": [
                    "Brand/comms direction with media channel implications",
                    "Behavioral guidelines influencing channel and partner selection"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic Insights"
                      ],
                      "agents": [
                        "Strategy Weaver",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6e",
                "number": "1.6e",
                "title": "Social Conversation & Presence",
                "summary": "Understand what's being said about Google brands in social/culture and determine how to lean into or shift the narrative.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Analyze social conversation about Google brands",
                    "Compare organic vs. paid sentiment",
                    "Track cultural trends and relevance",
                    "Identify partner/platform opportunities"
                  ],
                  "inputs": [
                    "Social listening data",
                    "Organic vs. paid analysis",
                    "Burson outputs",
                    "Platform-specific insights"
                  ],
                  "outputs": [
                    "Social conversation analysis (1-pager)",
                    "Opportunities for narrative shift",
                    "Partner selection inputs"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic Insights",
                        "US: Desk research",
                        "Social listening",
                        "SOM Burson",
                        "Platform publishers",
                        "EMEA: Culture replay (Sitely)",
                        "Platforms (Reddit direct)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "OMS + Beacon"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6f",
                "number": "1.6f",
                "title": "Historical Learnings",
                "summary": "Review past campaign performance (PCAs, incrementality, best practice adherence) to inform what worked, what didn't, and what must change.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Review PCAs and test results",
                    "Analyze incrementality / OBP data",
                    "Assess best practice playbook adherence",
                    "Identify what drove or failed to drive lift"
                  ],
                  "inputs": [
                    "PCA reports; Incrementality/OBP outputs",
                    "Best practice playbooks",
                    "CLS/BLS results (Goldfoil)",
                    "Platform reports + raw data",
                    "BP scorecard",
                    "Testing outputs",
                    "Performance data (DataLab/BigQuery)"
                  ],
                  "outputs": [
                    "Understanding of what worked/didn't",
                    "Inputs to playbook refinement",
                    "Tactical recommendations for next plan"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "OBP/OBP Lite",
                        "Platform reports",
                        "HBR/QBR/PCA decks",
                        "BP scorecard",
                        "Testing outputs",
                        "CLS/BLS (Goldfoil)",
                        "DataLab/BQ",
                        "Campaign Performance"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "Agentic Synthesis Agent",
                        "PA-level Historical Knowledge agent"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-1-6g",
                "number": "1.6g",
                "title": "Cross-PA / Cross-Market Learning",
                "summary": "Learn from other Product Areas or markets running similar campaigns. Chrome's app download learnings might transform Gemini's approach but only if someone knows to ask.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Identify comparable PAs/markets",
                    "Extract relevant learnings from other teams",
                    "Apply cross-PA/market insights to current planning",
                    "Leverage GLA test learnings across Pas"
                  ],
                  "inputs": [
                    "Other PA campaign data and PCAs",
                    "Cross-market learnings",
                    "GLA test results",
                    "Human conversations and institutional knowledge"
                  ],
                  "outputs": [
                    "Cross-PA/market insight summary",
                    "Applicable learnings for current plan"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Strategic Insights",
                        "Audience Insights",
                        "Historical data",
                        "Human conversations"
                      ],
                      "agents": [
                        "Brand Brief Buster",
                        "Strategy Weaver",
                        "SLA & Blueprint Navigator",
                        "SWOT Analysis",
                        "Comms Strategy GPS",
                        "Baby Strategist",
                        "DR: Unpack the Brief",
                        "Strat Sprint Showrunner",
                        "Audience Personas",
                        "Brief Responder",
                        "Strategic Signals",
                        "Behavioral Science",
                        "Brand Analytics"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "Meeting Transcripts Agent",
                        "PA-level knowledge base (shared)"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Live Scenario Planning Capability",
                  "description": "The team is expected to cover all 7 planning ingredients per PA but currently achieves 1–2 due to time constraints. Opportunity identified to enable real-time scenario building within Campaign Strategies — replacing weeks of manual spreadsheet modelling with the ability to toggle implications and generate channel/flighting outputs live in collaborative sessions."
                },
                {
                  "title": "Global Audience Composition Analysis",
                  "description": "NMI is US-only; non-US markets skip audience delivery analysis entirely, creating blind spots across half a billion dollars of spend. Opportunity identified to extend composition analysis globally via Campaign Strategies' non-targeted reach report — piloting now, targeting global rollout."
                },
                {
                  "title": "Scalable Competitive Intelligence",
                  "description": "Outside the US, competitive data is thin to non-existent — teams rely on calling media partners for anecdotal data. Opportunity identified to consolidate Charm, Meow, and Strategic Insights into a unified competitive agent, with SEMRush and Google Trends expanding coverage beyond US markets."
                },
                {
                  "title": "Automated Historical Learnings Synthesis",
                  "description": "PCA data, testing results, and BLS/CLS outputs are scattered across decks, spreadsheets, and platforms with no automated synthesis. The next campaign starts before the last one's PCA completes — its difficult for learnings to feed back. Opportunity identified to build a PA-level historical knowledge agent that surfaces what worked and what didn't without requiring someone to locate scattered decks."
                },
                {
                  "title": "Cross-PA Knowledge Sharing at Scale",
                  "description": "With 1,500 people across PAs and markets, relevant learnings exist but transfer is entirely human-dependent. Chrome's app download breakthrough could transform Gemini's approach. Opportunity identified to build a centralised, queryable knowledge base so learnings persist when people change roles and scale without requiring phone calls."
                },
                {
                  "title": "Burson Social Listening Integration",
                  "description": "Burson holds social conversation data; MFG holds media decisions — the two don't connect. Opportunity identified to establish a structured workflow between Burson's listening outputs and MFG's planning process, replacing inconsistent desk research with a reliable social intelligence input across markets Shared Opportunities (Google + MFG):"
                },
                {
                  "title": "Dynamic Product Insights Access",
                  "description": "Google's richest first-party signal (product usage, penetration, funnel data) currently arrives as static slide decks with no way to cross-reference against media delivery or planning assumptions. Opportunity identified to move toward queryable, dynamic access — enabling MFG to overlay product signals with media data rather than treating them as one-off presentations."
                },
                {
                  "title": "Creative–Media Alignment to Reduce Late-Stage Rework",
                  "description": "Creative agencies are often briefed by Google separately without media context; direction changes surface late, causing cascading rework across media plans. Opportunity identified to establish earlier coordination between creative briefing and media planning — ensuring format requirements and brand behaviour implications are shared at the point of plan development, not after."
                },
                {
                  "title": "Planning Window for Full Ingredient Coverage",
                  "description": "Achieving all 7 ingredients requires sufficient time and timely inputs. When upstream approvals, OBP outputs, or product data arrive late, the available window compresses and teams triage to 1–2 ingredients. Opportunity identified to align on a shared planning cadence that protects the window for comprehensive annual planning — so the strategic backbone is built once and held, rather than quarterly re-planning from scratch."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Strategic Insights",
              "Audience Insights",
              "NMI (Nielsen Media Impact)",
              "BAV (Brand Asset Valuator)",
              "GWI",
              "Pathmatics",
              "Charm",
              "Sightly / Culture Replay",
              "Comscore",
              "eMarketer",
              "Forrester",
              "OBP / OBP Lite",
              "SEMRush",
              "Google Trends",
              "Brand Brief Buster",
              "Strategy Weaver",
              "SLA & Blueprint Navigator",
              "SWOT Analysis",
              "Comms Strategy GPS",
              "Baby Strategist",
              "DR: Unpack the Brief",
              "Strat Sprint Showrunner",
              "Audience Personas",
              "Brief Responder",
              "Strategic Signals",
              "Behavioral Science",
              "Brand Analytics",
              "Synthetic Focus Groups",
              "How Might We",
              "Creative Director",
              "Planner",
              "Market Specifics"
            ],
            "valueCreation": []
          }
        }
      ],
      "icon": "D"
    },
    {
      "id": "create",
      "title": "Create",
      "subtitle": "Development & Production",
      "accent": "#ea4335",
      "summary": "Turn the strategy into channel plans, creative requirements, production assets, and trafficking-ready campaign components.",
      "signal": "From direction to designed delivery",
      "subphases": [
        {
          "id": "publisher-forecasting-planning",
          "title": "Publisher Forecasting & Planning",
          "summary": "This phase translates the strategic plan into executable campaign specifications. It spans publisher-level forecasting and audience translation, test prioritisation against GLA/PMM priorities and measurement slot availability, and measurement framework design across Brand and DR. Together, these are the bottoms-up validation of the top-down strategic plan, where channels, formats, tests, and success metrics get locked before activation begins.",
          "milestone": "This phase translates the strategic plan into executable campaign specifications. It spans publisher-level forecasting and audience translation, test prioritisation against GLA/PMM priorities and measurement slot availability, and measurement framework design across Brand and DR. Together, these are the bottoms-up validation of the top-down strategic plan, where channels, formats, tests, and success metrics get locked before activation begins.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-2-1",
                "number": "2.1",
                "title": "Publisher Forecast & Priorities",
                "summary": "Translate the strategic plan into tactical publisher-level forecasts. Understand minimum budgets per partner to meet best practices, translate audiences into platform targeting, prioritize formats, and produce combined reach estimates. This is the bottoms-up validation of the top-down strategic plan.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Translate audiences into platform-specific targeting",
                    "Assess minimum spend per publisher to meet MBPs (reach, frequency, viewability)",
                    "Prioritize formats by cost-effectiveness per audience",
                    "Gather max availabilities from publishers (RFP process)",
                    "Produce combined reach forecast",
                    "Run audience decomposition and flighting scenarios",
                    "Validate bottoms-up plan against top-down long-range plan"
                  ],
                  "inputs": [
                    "OBP Budgets",
                    "T1: Long-range plan (reach, flights, frequency, composition, past learnings)",
                    "T2/T3: Campaign brief + Activation packet",
                    "Google-provided 1PD audience segments",
                    "Channel best practices (min. reach, frequency, AVOC)",
                    "Pricing/rate cards",
                    "Historical campaign data and past audiences"
                  ],
                  "outputs": [
                    "Audience translation per partner/platform",
                    "Max availabilities from publishers",
                    "Combined reach forecast",
                    "Audience decomposition + flighting (variances to long-range plan)",
                    "Scenario plans for client approval"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Publisher RFP responses",
                        "Google Sheets (Trix)",
                        "Historical data",
                        "Past Audiences (PA basis)",
                        "Platform reach rools",
                        "SDN: Safer Data Navigator"
                      ],
                      "agents": [
                        "RFP Process Companion",
                        "DR: Brief Activation Packet",
                        "RFP Process Companion"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Audience Insights + Campaign Tactics"
                      ],
                      "agents": [
                        "Strategy-Tactics Alignment Agent",
                        "Agent to justify scenario recommendations",
                        "Media Reality Sense check (aligning forecast outputs with ObP + Campaign Strat)"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": [
                        "Audience Insights + Campaign Strategy + Publisher Recommendations Agent",
                        "IDEA: Feedback loop agent: _x000B_Campaign Strategies ↔ Campaign Tactics"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-2-2",
                "number": "2.2",
                "title": "Test Planning (CAP)",
                "summary": "Prioritize which tests to run based on GLA, PMM priorities, campaign feasibility, and measurement slot availability. The CAP document captures the test universe, shortlists, and design parameters.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Review GLA test priorities and PMM requests",
                    "Assess feasibility per campaign (budget, geo, timing)",
                    "Prioritize tests against available CLS/MMT slots",
                    "Design MMT geo-exclusions",
                    "Define non-GLA tests (PMM-driven)",
                    "Produce finalized CAP document"
                  ],
                  "inputs": [
                    "CAP document (universe of test possibilities)",
                    "CLS testing slots available",
                    "Approved tactical plan + scenario plan",
                    "PMM test priorities",
                    "GLA priorities",
                    "GPOD test design review"
                  ],
                  "outputs": [
                    "Finalized tests within plan",
                    "Shortlisted CAP document",
                    "Changes to channel budget based on testing scenarios",
                    "GPOD test design review approval"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Testing toolkit",
                        "CAP (Google Sheet)",
                        "Buttery dashboard (consolidated CAP view)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "IDEA: Agent to identify best test for campaign (GLA)"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": [
                        "IDEA: Agent to identify best test for campaign (GLA + PMM + feasibility)"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-2-3",
                "number": "2.3",
                "title": "Measurement Planning (Incl. tagging)",
                "summary": "Define how campaign efficacy will be demonstrated. Design measurement framework across brand and DR, including conversion tracking, BLS/CLS study design, and tagging requirements.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Design measurement framework (demonstrate if campaign worked)",
                    "Define tagging and tracking requirements per platform",
                    "Coordinate with analytics on study setup specifications",
                    "Align measurement plan with test plan and media plan",
                    "Ensure MFG App prerequisites are met"
                  ],
                  "inputs": [
                    "Approved media plan",
                    "Test plan (CAP)",
                    "Platform measurement capabilities",
                    "Historical measurement baselines"
                  ],
                  "outputs": [
                    "Measurement plan document",
                    "Tagging requirements handed to activation",
                    "Study design specifications for partner setup"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Partner budgets — Campaign tactics",
                        "Media Plan — Campaign Management",
                        "Channel Budgets — Campaign Strategies",
                        "Replanning testing implications for min/max differences"
                      ],
                      "agents": [
                        "RFP Process Companion",
                        "Check & Challenge"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Automated Tactical Data Assembly",
                  "description": "Publisher forecasting is currently the most manual-intensive planning activity: audience translation, format prioritisation, and reach forecasting happen across fragmented sources (Trix, NMI, GWI, RFP responses) with nothing pulling together in real-time. Opportunity identified to connect these into a unified environment where scenario generation replaces spreadsheet re-keying."
                },
                {
                  "title": "Real-Time Strategic-to-Tactical Variance Tracking",
                  "description": "There is no automated mechanism to flag when bottoms-up tactical forecasts deviate from the top-down long-range plan; misalignment surfaces late, triggering rework. Opportunity identified to build dependency logic that surfaces variances as they emerge rather than at final review."
                },
                {
                  "title": "Linked Scenario Plan and CAP",
                  "description": "The scenario plan and CAP must be created in parallel but are disconnected; every change in one forces manual re-assessment of the other, consuming ~25% of analytics team time on measurement planning mechanics. Opportunity identified to link these documents so changes in one automatically surface implications for the other."
                },
                {
                  "title": "Consolidated Measurement System",
                  "description": "Brand uses a Measurement Plan (survey-based, 20+ sub-cuts); DR uses the CAP; Media Lab PMMs consider one redundant. Opportunity identified to merge into a single adaptive document that absorbs upstream changes without full redesign — eliminating duplication and freeing analytics capacity for actual analysis. Shared Opportunities (Google + MFG)"
                },
                {
                  "title": "Structured Change-Management for Mid-Development Shifts",
                  "description": "Google's fast-paced product development forces constant campaign restructuring after tactical planning has begun. Work already done gets invalidated, staggered launches become the norm, and the compression increases error risk. Opportunity identified to co-define a protocol for assessing downstream impact before changes are committed — so both sides understand the cost of late shifts."
                },
                {
                  "title": "Quantitative Test Selection Framework",
                  "description": "Aligning with Google on which tests to run is currently qualitative and subjective, making it difficult to defend priorities when PMM requests conflict with measurement slots or geo-dark constraints. Opportunity identified to develop a shared scoring model that ranks test candidates against feasibility, learning value, and GLA graduation potential — replacing debate with evidence."
                },
                {
                  "title": "Unified Measurement Documentation Standard",
                  "description": "Different Google stakeholders reference different documents (Brand vs DR), creating confusion about which is authoritative and doubling coordination burden when plans evolve. Opportunity identified to align with Media Lab on a single measurement planning format that serves both needs without redundancy."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Campaign Strategies",
              "Campaign Tactics",
              "Campaign Management (OMS)",
              "Campaign Management (Olive / CM 1.0)",
              "Media Ocean",
              "Google Sheets (Media Plan Trix)",
              "Google Sheets (Financial Trix)",
              "Google Sheets (Asset Tracker)",
              "Testing Toolkit",
              "Codex",
              "RFP Process Companion",
              "DR: Brief to Activation Packet"
            ],
            "valueCreation": []
          }
        },
        {
          "id": "final-media-plan-confirmation-trix",
          "title": "Final Media Plan Confirmation (Trix)",
          "summary": "This group of jobs represents the sequence through which strategic direction becomes an executable, financially governed plan. It begins with the tactical version of the 13-slide deck — which codifies partners, dates, budgets, and measurement commitments agreed with the client — and flows into the granular Media Plan (Trix), which serves as the structured breakdown of what will be bought, where, and at what cost. The process concludes with financial governance through Olive/Campaign Manager, where media plan line items are uploaded for cross-functional approval (CoE Medialabs, PMMs), ultimately enabling trafficking, IO generation, and campaign activation. Together, these jobs bridge the gap between \"what we agreed strategically\" and \"what we are contractually committing to deliver,\" creating the handshake between planning intent and operational execution.",
          "milestone": "This group of jobs represents the sequence through which strategic direction becomes an executable, financially governed plan. It begins with the tactical version of the 13-slide deck — which codifies partners, dates, budgets, and measurement commitments agreed with the client — and flows into the granular Media Plan (Trix), which serves as the structured breakdown of what will be bought, where, and at what cost. The process concludes with financial governance through Olive/Campaign Manager, where media plan line items are uploaded for cross-functional approval (CoE Medialabs, PMMs), ultimately enabling trafficking, IO generation, and campaign activation. Together, these jobs bridge the gap between \"what we agreed strategically\" and \"what we are contractually committing to deliver,\" creating the handshake between planning intent and operational execution.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-2-4",
                "number": "2.4",
                "title": "Media Plan (Trix)",
                "summary": "Build the single source of truth for media execution and financial tracking. Captures all buying parameters and serves as the contract between planning, activation, finance, and client.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Build structured media plan (partner, market, tactic, channel, platform, format)",
                    "Include flowcharting (weekly flighting)",
                    "Incorporate commission + fee summary",
                    "Obtain client approval",
                    "Issue final plan for downstream execution"
                  ],
                  "inputs": [
                    "Confirmed forecasts from publishers",
                    "Partner rate cards + buying currency",
                    "PA-specific template",
                    "Format specifications",
                    "Approved scenario selection"
                  ],
                  "outputs": [
                    "Approved media plan (Trix)",
                    "Triggers PO request process",
                    "Commission + fee summary",
                    "Detailed buying breakdown",
                    "Budget tracking framework",
                    "Flighting"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "G-Sheets (Media Plan Trix, Financial Trix)"
                      ],
                      "agents": [
                        "Campaign Management (Olive) Helper"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Financials + PO",
                        "IDEA: A dashboard that captures information holistically across Media Plan inputs"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Campaign Management 2.0",
                        "IDEA: Auto-build from Media Plan logic"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-2-6",
                "number": "2.6",
                "title": "13-Slide Deck",
                "summary": "Final client-facing deck incorporating tactical detail: publisher forecasts, audience translations, flighting, measurement approach, and budget allocations. The bridge between strategic intent and execution commitment. Client approval here triggers PO and activation.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Synthesize all planning outputs into narrative deck",
                    "Connect strategic direction to tactical execution rationale",
                    "Present budget allocations with justification",
                    "Include measurement approach",
                    "Obtain client approval to proceed"
                  ],
                  "inputs": [
                    "All outputs from publisher forecasting, test planning, measurement planning",
                    "Strategic direction (from Discover phase)",
                    "Scenario plan selections",
                    "Executive summary for senior stakeholders"
                  ],
                  "outputs": [
                    "Approved 13-slide tactical deck",
                    "Go signal for media plan finalization",
                    "Executive summary (travels to senior approval)",
                    "Triggers PO request and activation preparation"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Google Slides"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "IDEA: 13-slide deck auto-generation agent (template-based)"
                      ]
                    },
                    "next": {
                      "tools": [],
                      "agents": [
                        "OMS Storytelling Agent (Campaign Strategies + Campaign Tactics → narrative)"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-2-7",
                "number": "2.7",
                "title": "Plan for PO Approval (Olive/CM)",
                "summary": "Upload the approved media plan into Campaign Manager (Olive/CM 1.0) to trigger formal Purchase Order request and approval from Google finance.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Upload media plan to Olive (plan line level)",
                    "Request approvals from CoE Media Labs + PMM",
                    "Track approval status",
                    "Submit offline lines to Media Ocean"
                  ],
                  "inputs": [
                    "Approved media plan (Trix)",
                    "Media Lab POC + PMM POC",
                    "Client PO documentation"
                  ],
                  "outputs": [
                    "Approved PO in system",
                    "Enables trafficking to begin",
                    "Supplier IO generation triggered"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Media Plan — Campaign Management (Olive/CM 1.0)",
                        "Media Ocean"
                      ],
                      "agents": [
                        "Campaign Management (Olive) Helper"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Split Financials",
                        "IDEA: Campaign Management 2.0 - MVP Readiness",
                        "IDEA: Auto upload from Media Trix to Olive"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Campaign Management 2.0 - Full Readiness",
                        "Plan Line templates"
                      ],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Unified Execution & Financial Tracking Layer",
                  "description": "The media plan currently lives in multiple Google Sheets (MP Trix, Financials Trix, Flowchart Trix) with no single artifact connecting what's being bought to how it's being tracked financially. Opportunity identified to decompose the media plan into purpose-built views — splitting financial tracking from execution detail — while maintaining a connected backbone that serves as a genuine single source of truth for both."
                },
                {
                  "title": "Automated Strategy-to-Tactics Deck Generation",
                  "description": "The tactical 13-slide deck (V2) is manually assembled to translate upstream strategic direction into partner-level commitments. Opportunity identified to auto-generate this document from structured plan data via a storytelling agent (OMS), ensuring the strategic narrative and campaign tactics remain connected without manual re-assembly each sprint."
                },
                {
                  "title": "Streamlined Approval Pathway (Trix → Olive)",
                  "description": "The PO approval process via Olive/CM 1.0 is described as complicated and slow, with teams defaulting to Google Sheets as a workaround. Opportunity identified to build a direct upload mechanism from Media Trix to Olive, eliminating manual re-entry of plan lines and preparing the workflow for Campaign Manager 2.0 — including standardized plan line item templates that reduce approval friction."
                },
                {
                  "title": "Measurement Integrated Into the Media Plan",
                  "description": "Measurement planning currently sits in a separate document, creating downstream disconnects when activation teams need to reconcile what's being tracked against what's being bought. Opportunity identified to embed measurement commitments (testing method, hypothesis, KPIs) directly within the media plan structure, reducing handoff errors and improving traceability. Shared Opportunities (Google + MFG):"
                },
                {
                  "title": "Client-Readable Plan Visibility",
                  "description": "The media plan in its execution-ready form is too complex for client review, yet Google approval is a critical gate before activation can proceed. Opportunity identified to co-define a client-facing plan view that surfaces the decisions Google needs to approve (channel budget allocation, audience composition, flighting, partner selection) without requiring navigation of the full execution-level Trix — reducing approval turnaround and re-work cycles on both sides."
                },
                {
                  "title": "Synchronized Approval & PO Workflow",
                  "description": "The PO process depends on Google providing a Client PO after media plan approval, and PMM sign-off is required before trafficking can begin. Currently, the timing between MFG's internal plan readiness and Google's approval cadence creates bottlenecks. Opportunity identified to align on a shared approval SLA and sequencing protocol — so that plan finalization, PMM review, and Client PO issuance happen in a coordinated window rather than serially, compressing the critical path to activation."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Campaign Strategies",
              "Campaign Tactics",
              "Campaign Management (OMS)",
              "Campaign Management (Olive / CM 1.0)",
              "Media Ocean",
              "Google Sheets (Media Plan Trix)",
              "Google Sheets (Financial Trix)",
              "Google Sheets (Asset Tracker)",
              "Testing Toolkit",
              "Codex",
              "RFP Process Companion",
              "DR: Brief to Activation Packet"
            ],
            "valueCreation": []
          }
        },
        {
          "id": "creative-management",
          "title": "Creative Management",
          "summary": "This job translates the approved media plan into specific creative production requirements and manages the delivery lifecycle with external agencies. It defines creative specifications (formats, sizes, durations, variations) based on the media plan, briefs creative agencies on platform requirements and digital best practices, tracks delivery status against SLAs, and QAs incoming assets for platform compliance before handoff to activation. The asset tracker is the connective tissue between what the media plan demands and what creative production delivers — enabling activation teams to begin shell builds and trafficking only once confirmed, compliant assets are in hand. It sits at the critical intersection of multiple parties: Planning (who own the wishlist), Activation (who need the assets), Ad Ops (who traffic them), and external creative agencies (Hogarth/WPP Production/Creative Lab) who produce them.",
          "milestone": "This job translates the approved media plan into specific creative production requirements and manages the delivery lifecycle with external agencies. It defines creative specifications (formats, sizes, durations, variations) based on the media plan, briefs creative agencies on platform requirements and digital best practices, tracks delivery status against SLAs, and QAs incoming assets for platform compliance before handoff to activation. The asset tracker is the connective tissue between what the media plan demands and what creative production delivers — enabling activation teams to begin shell builds and trafficking only once confirmed, compliant assets are in hand. It sits at the critical intersection of multiple parties: Planning (who own the wishlist), Activation (who need the assets), Ad Ops (who traffic them), and external creative agencies (Hogarth/WPP Production/Creative Lab) who produce them.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-2-5",
                "number": "2.5",
                "title": "Asset Tracker (Creative Tracker - Receipt)",
                "summary": "Connect media specifications to creative production. Define what assets are needed, brief creative agencies, and track delivery.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Define creative specifications based on media plan (formats, sizes, durations, variations)",
                    "Brief creative agencies on requirements and best practices",
                    "Track creative delivery status",
                    "Ensure assets meet platform requirements (specs, language, compliance)",
                    "QA creative against best practices pre-handoff to activation"
                  ],
                  "inputs": [
                    "Media plan (approved channels and formats)",
                    "Platform specifications and best practices",
                    "Creative brief (from Google/Creative Lab)",
                    "Creative testing requirements",
                    "Historical creative performance data",
                    "Creative Wishlist"
                  ],
                  "outputs": [
                    "Finalized asset tracker (creative receipt confirmation)",
                    "Creative specifications for agency",
                    "Activation pre-prep enabled (shells can begin)",
                    "Creative QA completed"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Google Sheet (Asset Tracker)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Creative Analytics & Creative Library (checks whether campaigns are fit for production and also replaces Google Sheet Assett tracker)",
                        "QA and Checks"
                      ],
                      "agents": [
                        "Digital Best Practices agent (for MFG and Agencies)",
                        "IDEA: Creative Wishlist Pack - Slide Stock"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Predictive performance scoring",
                        "Scaled Creative Library (external agency access)"
                      ],
                      "agents": [
                        "IDEA: Creative Wishlist Agent (pre-populate slides + integration w. analytics library)",
                        "IDEA: Full QA coverage Agent"
                      ]
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Standardized Asset Tracker Across Product Areas",
                  "description": "Multiple tracker versions currently exist across PAs with no standardization — each with different structures, fields, and levels of granularity. Opportunity identified to establish a single, unified asset tracker format (migrating from fragmented Google Sheets to Creative Analytics & Creative Library) that works consistently across all Product Areas, reducing version confusion and enabling cross-PA creative intelligence."
                },
                {
                  "title": "Digital Best Practices Self-Service",
                  "description": "Teams currently spend hours per campaign explaining digital platform requirements and best practices to creative agencies before production begins. Opportunity identified to deploy a Digital Best Practices agent (accessible to both MFG and external agencies) that provides instant, always-current platform specification guidance — shifting the agency briefing from repeated manual education to self-serve reference with human oversight."
                },
                {
                  "title": "Predictive Creative Performance",
                  "description": "There is currently no forward-looking view of which creative assets are likely to perform before they go live — assessment happens only post-activation. Opportunity identified to integrate historical creative performance data into the asset receipt workflow via predictive performance scoring, enabling early identification of high-potential and at-risk assets before they enter trafficking — reducing wasted activation effort on underperforming creative."
                },
                {
                  "title": "Automated Creative QA at Scale",
                  "description": "Pre-handoff QA (language, specs, compliance, platform fit) is manual and error-prone across the volume of assets and platforms involved. Opportunity identified to layer automated QA checks (via Creative Analytics Library integration) into the asset receipt process, catching specification mismatches and compliance issues at the point of delivery rather than downstream during trafficking or — worse — post-launch. Shared Opportunities (Google + MFG):"
                },
                {
                  "title": "Creative Delivery Timeline Alignment",
                  "description": "The established SLA for creative asset delivery is 3 weeks, but reality frequently compresses to ~1 week. Late creative delivery cascades into compressed QA, rushed trafficking, and increased error rates downstream. Opportunity identified to co-establish a reinforced delivery protocol with shared visibility into production status — so both sides can flag slippage early and make informed trade-off decisions (e.g., reduce asset variations vs. compress QA) before the cascade begins."
                },
                {
                  "title": "Upstream Creative Change Governance",
                  "description": "Creative direction changes originating from Google/Creative Lab after initial specifications are locked cascade into rework across MFG's planning, activation, and ad ops workflows — often without proportional timeline extension. Opportunity identified to jointly define a creative change threshold and cut-off protocol that acknowledges the downstream cost of late changes, providing both parties with a shared framework for when changes are absorbed vs. when timelines or scope must adjust in response."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Campaign Strategies",
              "Campaign Tactics",
              "Campaign Management (OMS)",
              "Campaign Management (Olive / CM 1.0)",
              "Media Ocean",
              "Google Sheets (Media Plan Trix)",
              "Google Sheets (Financial Trix)",
              "Google Sheets (Asset Tracker)",
              "Testing Toolkit",
              "Codex",
              "RFP Process Companion",
              "DR: Brief to Activation Packet"
            ],
            "valueCreation": []
          }
        }
      ],
      "icon": "C"
    },
    {
      "id": "activate",
      "title": "Activate",
      "subtitle": "Execution & Growth",
      "accent": "#34a853",
      "summary": "Move from planned campaign into live execution, launch readiness, and in-flight optimization.",
      "signal": "From plan to live performance",
      "subphases": [
        {
          "id": "campaign-trafficking-launch-monitoring",
          "title": "Campaign Trafficking, Launch & Monitoring",
          "summary": "This phase converts the approved media plan into live, serving campaigns across 10+ vendor platforms. It spans campaign shell building (targeting, dates, budgets), insertion order production, trafficking sheet creation, creative asset association, pre-launch quality assurance, and 48-hour post-launch verification. The work is highly sequential — each job depends on outputs from the one before it — and involves coordination across Planning, Activation, Ad Ops, and external vendor partners. Today, the phase is characterised by manual handoffs, document-based workflows (G-sheets, emails, PDFs), and multiple layers of QA to catch errors introduced by upstream inconsistencies. Campaign Governance is live but operating at approximately 5% of its potential coverage, with a roadmap to reach 50%+ as the primary automation platform for setup validation and ongoing monitoring.",
          "milestone": "This phase converts the approved media plan into live, serving campaigns across 10+ vendor platforms. It spans campaign shell building (targeting, dates, budgets), insertion order production, trafficking sheet creation, creative asset association, pre-launch quality assurance, and 48-hour post-launch verification. The work is highly sequential — each job depends on outputs from the one before it — and involves coordination across Planning, Activation, Ad Ops, and external vendor partners. Today, the phase is characterised by manual handoffs, document-based workflows (G-sheets, emails, PDFs), and multiple layers of QA to catch errors introduced by upstream inconsistencies. Campaign Governance is live but operating at approximately 5% of its potential coverage, with a roadmap to reach 50%+ as the primary automation platform for setup validation and ongoing monitoring.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-3-1",
                "number": "3.1",
                "title": "Pre-Activate Setup ( Campaign Shell Build)",
                "summary": "Begin building campaign shells in platforms before all final elements are confirmed.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Build campaign shells (targeting, dates, brand safety)",
                    "Confirm budgets with partners (post-PO formal acceptance)",
                    "Set up measurement studies in platform",
                    "Google Ads experiment setup",
                    "Social-specific measurement configuration"
                  ],
                  "inputs": [
                    "Media plan (approved or high-confidence draft)",
                    "Measurement plan (testing method, hypothesis)",
                    "Best practice playbooks + platform brand safety settings",
                    "Asset tracker (creative format — even if incomplete)",
                    "Campaign Brief",
                    "T-Sheet"
                  ],
                  "outputs": [
                    "Campaign shells built in platforms",
                    "Partner budget confirmation",
                    "Measurement study frameworks initiated"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "3rd party platform tools (Meta, Google Ads, DV360)",
                        "Email to partners",
                        "Google Sheets (naming conventions)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Campaign shell building automation (Meta, DV360)",
                        "Campaign Governance",
                        "Creative Analytics",
                        "Creative Optimization"
                      ],
                      "agents": [
                        "IDEA: Guidance Agent"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Unified Activation Platform (shell build + governance)"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-2",
                "number": "3.2",
                "title": "IO Production for Vendors",
                "summary": "Generate Insertion Orders (IO) for non-DSP vendors (direct publisher buys). Document-based contracting process with legal/financial implications.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Generate IO from Olive PO number",
                    "Populate IO template with campaign details and WPP T&Cs",
                    "Share IO with vendor for signature",
                    "Obtain signed IO (MFG + Supplier)",
                    "Store signed IO in system"
                  ],
                  "inputs": [
                    "Client confirmation (Olive PO number)",
                    "Confirmed media plan",
                    "IO template (WPP terms & conditions, targeting dimensions)",
                    "Asset tracker"
                  ],
                  "outputs": [
                    "Signed IO (both parties)",
                    "IO stored in Olive",
                    "Vendor formally committed"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Campaign Management (Olive)",
                        "Google Sheets (IO population)",
                        "Email"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "IO Generator agent _x000B_(auto-populate from media plan)"
                      ]
                    },
                    "next": {
                      "tools": [
                        "CM 2.0 (auto-creates IO + sends to vendor)"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-3",
                "number": "3.3",
                "title": "Build T-Sheet & Trafficking",
                "summary": "Create the trafficking sheet containing all campaign setup instructions (landing pages, tags, naming conventions, targeting logic).",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Planning/Activation create T-sheet (campaign info, landing pages, tags, logic)",
                    "Activation builds placements in Olive (generates placement names)",
                    "Ad Ops creates creative tags + trackers in CM360",
                    "QA of T-sheet by Planning/Activation",
                    "Share tags with activation team and vendors"
                  ],
                  "inputs": [
                    "Complete creative asset tracker",
                    "Creative testing results (often arrive late)",
                    "Media plan",
                    "Olive placement data",
                    "Measurement plan"
                  ],
                  "outputs": [
                    "T-sheet delivered to Ad Ops",
                    "Tags created and distributed",
                    "Placements built in Olive"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Campaign Management (Olive — placement names)",
                        "Placement Builder",
                        "T-sheet (Google Sheet)",
                        "Wrike (ticketing to Ad Ops)",
                        "CM360 (tag creation)",
                        "Measurement Plan"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Creative Optimisation expanded (trackers for social)",
                        "Campaign Governance",
                        "Unified Activation Platform (Meta coverage)",
                        "Master Builder (Google Ads Trafficking)"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Unified Trafficking (automates name generation, T-sheet, tags)"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-4",
                "number": "3.4",
                "title": "Finalization: Build Campaign",
                "summary": "Final assembly — add creative assets to campaign shells, complete 3rd-party ad serving (3PAS), confirm vendor readiness. First time anyone sees the full campaign assembled in platform.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Share creative assets + tags with partners",
                    "Build ads in platform (assign assets to campaigns)",
                    "Creative QA against platform specs",
                    "3rd-party ad serving (3PAS) implementation",
                    "Finalize campaign shell builds",
                    "Confirm vendor readiness (10+ vendors per campaign)"
                  ],
                  "inputs": [
                    "Creative asset tracker (finalized)",
                    "Olive placement names + tags from Ad Ops",
                    "Measurement plan",
                    "Media plan",
                    "Creative testing results (may be post-launch)"
                  ],
                  "outputs": [
                    "Ads built in platform",
                    "Finalized campaigns (ready for pre-launch QA)",
                    "Vendors confirmed ready",
                    "3PAS completed"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "3rd party Platform tools",
                        "3PAS form (3PAS)",
                        "Google Sheets (3PAS tracking)",
                        "SA360*",
                        "Creative Codex"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Creative Optimisation expanded (ad build + association for social)",
                        "Unified Activation platform (Creative Library/Analytics)",
                        "Master Builder (Google Ads)"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Unified Activation platform"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-5",
                "number": "3.5",
                "title": "Campaign Launch: QA",
                "summary": "Comprehensive pre-launch quality assurance. The last gate before going live — checking setup against best practices, governance, brand safety, measurement specs, and compliance.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "QA against media best practices checklist (channel-specific)",
                    "Verify brand safety and privacy compliance",
                    "Confirm measurement study readiness",
                    "Two-eye review process (senior/manager sign-off)",
                    "Complete go-live form"
                  ],
                  "inputs": [
                    "Media plan",
                    "MBP QA checklists (auto-generated per platform)",
                    "Brand safety requirements + privacy policy",
                    "Measurement plan",
                    "Asset tracker"
                  ],
                  "outputs": [
                    "QA checklist completed (pre-launch)",
                    "Go-live form approved",
                    "Campaign cleared for launch"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Google Docs (QA checklists)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Campaign Governance expanding (15% → 50% coverage)",
                        "Creative Analytics"
                      ],
                      "agents": [
                        "Pre-Launch QA Support Agent"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Campaign Governance full pre-launch QA",
                        "Automate screenshot fetching"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-6",
                "number": "3.6",
                "title": "Post-Launch QA (48 hours)",
                "summary": "Within 48 hours of launch, verify everything is serving correctly — tracking, pacing, creative display, measurement studies collecting data. Fix issues immediately if applicable.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Verify campaigns are serving (impressions flowing)",
                    "Check status/approvals in platforms",
                    "Ensure setup matches media plan",
                    "Fix identified issues",
                    "Verify measurement studies tracking/collecting sample"
                  ],
                  "inputs": [
                    "Platform reports/access",
                    "QA checklist (PA-specific)",
                    "Media Account Tool (MAT)",
                    "Campaign Governance",
                    "Best practice checklist"
                  ],
                  "outputs": [
                    "Post-launch QA checklist completed",
                    "No pacing flags (or flags addressed)",
                    "List of actions fixed",
                    "Measurement studies confirmed operational"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Campaign Governance (5%)",
                        "Platforms direct",
                        "G-Sheets (auto-generated)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [
                        "Campaign Governance (15%)"
                      ],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Campaign Governance (>50%)",
                        "Auto-checker",
                        "Auto-fixer"
                      ],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Unified Trafficking & Activation Pipeline",
                  "description": "Today, the path from media plan to live campaign passes through 6 discrete jobs, each with its own tooling (Olive, T-sheets, CM360, Wrike, G-sheets, email). Opportunity identified to consolidate name generation, tag creation, placement building, and ad assignment into a single automated pipeline — with unified trafficking expected to eliminate the T-sheet entirely and reduce the ~4-stakeholder handoff chain to a programmatic flow."
                },
                {
                  "title": "Campaign Governance as the QA Backbone",
                  "description": "Campaign Governance currently covers ~5% of QA checks, with ambition to reach 15% near-term and 50% in the next horizon. Workshop participants estimated 50–60% of pre-launch and post-launch QA is automatable (e.g., naming conventions, brand safety compliance, pacing verification). Opportunity identified to accelerate CG adoption as the single platform for pre-launch checklists, post-launch monitoring, and auto-detection of setup errors — while preserving human judgment for the ~40% that requires qualitative assessment (e.g., creative appeal)."
                },
                {
                  "title": "IO Production Automation",
                  "description": "Insertion orders for non-DSP vendors are currently produced manually via G-sheets and emailed individually, with error risk on templates carrying financial liability (contractual penalties for non-fulfilment). Opportunity identified to build IO generation into Campaign Management 2.0, auto-populating from confirmed media plans and WPP terms, reducing manual error on a document with direct contractual implications."
                },
                {
                  "title": "Reducing Rework from Upstream Quality",
                  "description": "Errors discovered at QA (launch and post-launch) frequently originate from earlier phases — incomplete asset trackers, inconsistent naming, or media plans not reflecting latest changes. Opportunity identified to implement earlier-stage validation gates (e.g., within Campaign Governance at the trafficking stage) so that defects are caught before they cascade into platform builds across 10 vendors simultaneously. Shared Opportunities (Google + MFG)"
                },
                {
                  "title": "Creative Asset & Test Result Timing",
                  "description": "Campaign finalization requires creative assets and in-lab test results to be in hand before ads are built in-platform. Currently, creative assets frequently arrive late against SLAs, and test results from Google often land after ads have already been built — sometimes requiring cancellation or rebuilding of ads post-fact. Opportunity identified to co-define a shared delivery timeline with committed SLA checkpoints for creative handoff and test result delivery, enabling MFG to lock activation builds with confidence rather than proceeding on assumption."
                },
                {
                  "title": "Pre-Activate Information Completeness",
                  "description": "The Pre-Activate Setup job was described in workshops as a \"workaround that shouldn't need to exist\" — teams build campaign shells under high uncertainty because key parameters (budget confirmations, targeting shifts, campaign changes) from Google arrive late or change during build. This frustrates stakeholders and forces rework. Opportunity identified to establish a shared \"activation readiness\" gate — a mutual confirmation point where both Google and MFG agree that campaign parameters are stable enough to begin platform builds, reducing the cycle of build-then-rebuild that currently adds weeks to activation timelines."
                },
                {
                  "title": "Measurement & Test Alignment at Setup",
                  "description": "Setting up measurement studies (MMT geo-exclusions, BLS cells) requires agreement on where to be \"dark\" geographically, but different Google product areas hold differing views on live vs. dark requirements. This creates a forecasting and planning conflict that delays activation setup. Opportunity identified to align on a shared measurement design protocol at the point of scenario plan approval — so that test geography requirements are locked before activation teams begin shell builds, rather than discovered as conflicts mid-setup."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Campaign Governance",
              "Production Studio",
              "Creative Analytics",
              "CM360",
              "Wrike",
              "Placement Builder",
              "3PS Form",
              "DV360",
              "Google Ads",
              "Meta Ads Manager",
              "SEMantha",
              "Victor the Scriptor",
              "Prog-Fessor",
              "Eve Aluator",
              "Custom Intent Targeting Expert"
            ],
            "valueCreation": []
          }
        },
        {
          "id": "tracking-in-flight-optimization",
          "title": "Tracking & In-flight optimization",
          "summary": "This phase encompasses the ongoing management of live campaigns — both the daily/weekly hygiene work that keeps delivery on track and the higher-order strategic decisions that improve performance against KPIs. It includes spend pacing monitoring, platform best-practice adoption checks (AIQ), measurement study health tracking (BLS, CLS, MMT), and the optimization decisions themselves: budget reallocation across channels, bid adjustments, creative weighting changes, and tactical re-flighting. These two jobs operate in a continuous loop — monitoring surfaces signals, optimization acts on them — but the workshop identified that the balance is currently inverted: the majority of team time is consumed by operational monitoring and upstream rework rather than the strategic optimization work that directly drives campaign outcomes. This is framed as the destination that all upstream efficiency gains (from automation of setup, trafficking, and QA) should ultimately point toward.",
          "milestone": "This phase encompasses the ongoing management of live campaigns — both the daily/weekly hygiene work that keeps delivery on track and the higher-order strategic decisions that improve performance against KPIs. It includes spend pacing monitoring, platform best-practice adoption checks (AIQ), measurement study health tracking (BLS, CLS, MMT), and the optimization decisions themselves: budget reallocation across channels, bid adjustments, creative weighting changes, and tactical re-flighting. These two jobs operate in a continuous loop — monitoring surfaces signals, optimization acts on them — but the workshop identified that the balance is currently inverted: the majority of team time is consumed by operational monitoring and upstream rework rather than the strategic optimization work that directly drives campaign outcomes. This is framed as the destination that all upstream efficiency gains (from automation of setup, trafficking, and QA) should ultimately point toward.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-3-7",
                "number": "3.7",
                "title": "In-Flight Campaign Optimization",
                "summary": "Assess live campaigns against target KPIs to inform optimization decisions.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Assess campaign performance against KPI targets",
                    "In-channel optimization (Activation): bid adjustments, audience refinement",
                    "Cross-channel optimization (Planning): budget reallocation between channels",
                    "Creative weighting / rotation adjustments",
                    "Recommend changes; obtain PMM approval; execute"
                  ],
                  "inputs": [
                    "Media plan budgets + platform delivery/spend data",
                    "Creative testing results + creative changes",
                    "Measurement results (BLS, CLS, MMT — as available)",
                    "Media best practices (decision triggers)",
                    "CAP results (as they arrive)"
                  ],
                  "outputs": [
                    "Budget reallocation decisions",
                    "Media plan changes (fed back to plan of record)",
                    "Bid increases/decreases",
                    "Creative weighting changes / re-flighting",
                    "Tactical budget shifts"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Incrementality Report",
                        "Brand Report",
                        "Platform pulls",
                        "Social partner scoring"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "OMS Creative Intelligence / In-flight Creative Dashboard",
                        "Campaign Management 2.0",
                        "Media Optimizations"
                      ],
                      "agents": [
                        "Media Optimization recommendations agent (w. impact scoring)"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-3-8",
                "number": "3.8",
                "title": "Pacing, Flags & Monitoring",
                "summary": "Ongoing daily/weekly monitoring of campaign delivery health. Hygiene work that ensures campaigns stay on track between optimization cycles.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Monitor spend pacing against plan (daily)",
                    "Check platform best practice adoption (AIQ — weekly)",
                    "Track BLS/CLS/MMT study health",
                    "Address MAT flags",
                    "Ensure measurement sample collection on track",
                    "Fix contamination issues in MMT markets"
                  ],
                  "inputs": [
                    "Platform reports",
                    "Incrementality + Brand reports",
                    "MAT flags",
                    "CLS dashboard (Google-maintained)",
                    "BLS channel-specific reports",
                    "MMT delivery dashboard (MFG-maintained)"
                  ],
                  "outputs": [
                    "EKG report (Ad Ops heartbeat check)",
                    "AIQ dashboard compliance status",
                    "Actions communicated to activation/measurement partners",
                    "Sample strategy adjustments (if needed)"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Google Sheets",
                        "Brand report",
                        "DataLab",
                        "MAT",
                        "~60 bespoke dashboards",
                        "MMT",
                        "CLS dashboard",
                        "BLS reports",
                        "3rd party platform delivery data",
                        "Campaign Governance",
                        "AiQ"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [
                        "Campaign Performance"
                      ],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "Reclaiming Time for Strategic Optimization",
                  "description": "The majority of in-flight time is currently absorbed by setup corrections, QA remediation, and monitoring hygiene rather than strategic decisions (budget reallocation, creative rotation, bid strategy). Opportunity identified to measure and track the ratio of operational vs. strategic time, using upstream automation gains (Campaign Governance, unified trafficking) to shift the balance toward the higher-value optimization work that directly impacts campaign KPIs."
                },
                {
                  "title": "Consolidated Monitoring",
                  "description": "From Multiple Dashboards to One — Pacing and monitoring currently relies on multiple bespoke dashboards across Product Areas, with inconsistent metrics, altitudes, and no unified accountability mechanism. The proliferation of dashboards is itself a symptom of the underlying data integrity problem (fragmented feeds, missing uploads, disconnected tools). Opportunity identified to consolidate into Campaign Performance (OMS) as a single monitoring layer — but contingent on solving the data foundation first (connection APIs, upload governance, DataLab as backbone)."
                },
                {
                  "title": "Accountability Mechanisms for Monitoring",
                  "description": "Monitoring flags are raised but lack a structured accountability loop — there is no consistent mechanism to ensure flagged issues are actioned, tracked, and closed. Opportunity identified to embed escalation and resolution workflows within Campaign Governance, creating auditability from flag → action → confirmation. Shared Opportunities (Google + MFG)"
                },
                {
                  "title": "Measurement Study Health as a Shared Responsibility",
                  "description": "BLS, CLS, and MMT studies require ongoing health checks during campaigns — ensuring sample collection is on track, contamination is avoided in MMT markets, and studies will yield statistically valid results. The CLS dashboard is Google-maintained, the MMT delivery dashboard is MFG-maintained, and contamination issues often require coordinated fixes across both parties. Opportunity identified to establish a shared measurement health protocol with joint visibility — so that both sides see study health status simultaneously and can co-act on contamination or sample risks before they invalidate results that inform the next planning cycle."
                },
                {
                  "title": "Optimisation Decisions Informed by Timely CAP & Test Results",
                  "description": "Cross-channel optimization and budget reallocation decisions are strongest when informed by in-flight measurement results (incrementality, brand lift, CAP test outcomes). Currently, these results arrive at varying cadences and sometimes after optimization windows have closed. Opportunity identified to align on a shared reporting cadence for in-flight test signals — ensuring that when results are available (even directional), they reach the optimization team within the decision window rather than after the fact."
                },
                {
                  "title": "In-Flight Creative Intelligence",
                  "description": "Creative drives an estimated ~50% of performance impact, yet creative weighting and rotation are under-optimised during live campaigns. Teams currently lack visibility into creative performance at a level that informs real-time decisions. Opportunity identified to introduce an in-flight creative dashboard (OMS Creative Intelligence) that surfaces creative fatigue, variant performance, and rotation recommendations — making creative a proactive optimization lever rather than a set-and-forget input."
                },
                {
                  "title": "Simulation & Impact Scoring for Optimization Decisions",
                  "description": "Teams are currently blind to the incremental impact of optimization trade-offs — they cannot quantify \"if I move $X from Channel A to Channel B, what's the expected lift?\" before executing. Decisions are made on qualitative judgment. Opportunity identified to develop a Media Optimization recommendations agent with impact scoring capability, enabling teams to simulate reallocation scenarios and prioritise moves by projected incremental return."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Campaign Governance",
              "Production Studio",
              "Creative Analytics",
              "CM360",
              "Wrike",
              "Placement Builder",
              "3PS Form",
              "DV360",
              "Google Ads",
              "Meta Ads Manager",
              "SEMantha",
              "Victor the Scriptor",
              "Prog-Fessor",
              "Eve Aluator",
              "Custom Intent Targeting Expert"
            ],
            "valueCreation": []
          }
        }
      ],
      "icon": "A"
    },
    {
      "id": "analyse",
      "title": "Analyze",
      "subtitle": "Measurement & Optimization",
      "accent": "#f9ab00",
      "summary": "Capture performance, produce reporting, and turn campaign results into reusable learning.",
      "signal": "From results to next-cycle intelligence",
      "subphases": [
        {
          "id": "reporting-reconcilation",
          "title": "Reporting & Reconcilation",
          "summary": "This group represents the continuous operational layer that keeps campaign data trustworthy across all downstream uses. It spans weekly performance commentary and optimization recommendations, ongoing data completeness management across platforms, structured QA and lock processes for leadership-level reporting, and monthly financial reconciliation for audit compliance. Collectively, these jobs maintain the data foundation that every other deliverable depends on — from in-flight optimization decisions through to VP scorecards and post-campaign evaluations. When this layer works, decisions are grounded; when it doesn't, trust erodes at every altitude.",
          "milestone": "This group represents the continuous operational layer that keeps campaign data trustworthy across all downstream uses. It spans weekly performance commentary and optimization recommendations, ongoing data completeness management across platforms, structured QA and lock processes for leadership-level reporting, and monthly financial reconciliation for audit compliance. Collectively, these jobs maintain the data foundation that every other deliverable depends on — from in-flight optimization decisions through to VP scorecards and post-campaign evaluations. When this layer works, decisions are grounded; when it doesn't, trust erodes at every altitude.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-4-1",
                "number": "4.1",
                "title": "In-Flight Reporting",
                "summary": "Weekly analysis of campaign dashboards to produce insights-based commentary, identify trends, explain performance, and recommend actions. The primary ongoing deliverable to the client during campaign flight.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Review MMM dashboard data (Monday — verify accuracy)",
                    "Compose insights-based commentary",
                    "Identify optimizations and recommendations",
                    "Deliver commentary to client (Wednesday)",
                    "Flag material changes requiring client decision"
                  ],
                  "inputs": [
                    "MMM Dashboard (primary)",
                    "Platform data (supplementary/validation)",
                    "MMT reports",
                    "Goldfoil (CLS results)",
                    "Testing Results",
                    "Incrementality / Brand Report",
                    "EMDP/Datalab",
                    "Optimization Logs"
                  ],
                  "outputs": [
                    "Text-based weekly commentary",
                    "Optimization recommendations (with action triggers)",
                    "Client-facing report/email"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "MMM Dashboard",
                        "EMDP (DataLab)",
                        "Incrementality Report",
                        "Brand Report",
                        "Platform Tools"
                      ],
                      "agents": [
                        "Commentary Agent"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "IDEA: Sanitize Templates for Commentary",
                        "IDEA: Commentary Agent V2 to pre-populate Data from Looker"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Conversational analytics",
                        "Campaign performance (OMS)"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-4-2",
                "number": "4.2",
                "title": "Data Uploads for Gaps (Data Integrity)",
                "summary": "Ensure the completeness and accuracy of central data by executing manual uploads where API connections are unavailable, resolving mapping errors, and maintaining strict alignment across all reporting systems.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Identify missing data uploads (via integrity reports/alerts)",
                    "Perform manual uploads to Olive/MFG App",
                    "Fix incorrect mappings and configuration errors",
                    "Reconcile misaligned spend reports",
                    "Monitor alerts and remediate flagged issues"
                  ],
                  "inputs": [
                    "Olive data",
                    "Platform feeds (where connected)",
                    "MFG data lake / MFG App data",
                    "Data integrity reports and automated alerts"
                  ],
                  "outputs": [
                    "Complete data set across all sources",
                    "Data gaps filled",
                    "Reporting systems accurate for downstream use (VP scorecard, PCA, HBR, financial reconciliation)"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Data Integrity Dashboard",
                        "Digital MMM Dashboard",
                        "Misaligned Spend Dashboard",
                        "Automated alerts with action guidance",
                        "MFG App* Check"
                      ],
                      "agents": [
                        "Campaign Management (Olive) Helper"
                      ]
                    },
                    "near": {
                      "tools": [
                        "Governance Model for Data Responsibilities",
                        "Integrated single data dashboard",
                        "DataLab as backbone (pilot)",
                        "Decision intelligence *Need to check"
                      ],
                      "agents": [
                        "\"WTF Agent\" (knowledge source for data quality — what to do, why, how to fix)"
                      ]
                    },
                    "next": {
                      "tools": [
                        "More API connectors (TikTok, Apple Search Ads)",
                        "Adverity → Campaign Performance migration",
                        "Campaign Management 2.0",
                        "Campaign Performance"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-4-3",
                "number": "4.3",
                "title": "Data Review for VP Scorecard",
                "summary": "Collect, QA, and lock campaign-level data that feeds the Google VP scorecard — BLS results, creative testing results, and media best practice metrics. This is what gets presented to Google leadership.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Weekly: Upload BLS data, creative testing results, MBP metrics to MFG App",
                    "Quarterly: Review automated feeds for accuracy",
                    "Review and confirm final outputs metric-by-metric",
                    "Lock campaign data once QA'd (freeze for reporting)",
                    "Provide commentary on anomalies"
                  ],
                  "inputs": [
                    "BLS study results",
                    "Creative testing results (+ mapping to media)",
                    "MBP metrics from platforms",
                    "Olive (CM) data"
                  ],
                  "outputs": [
                    "Updated VP Scorecard data feed",
                    "QA'd and locked campaign metrics",
                    "Commentary on outliers"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Campaign Performance",
                        "MFG App (metric QA, commentary, campaign lock)"
                      ],
                      "agents": [
                        "HBR Assistant — Story Finder",
                        "Weekly Wrap",
                        "Deep Researcher",
                        "Ideas Explorer",
                        "Check & Challenge",
                        "Campaign Management (Olive) Helper",
                        "Analogies"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": []
                    },
                    "next": {
                      "tools": [],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-4-4",
                "number": "4.4",
                "title": "Financial Reconciliation",
                "summary": "Monthly spend confirmation and proof of delivery. Upload platform screenshots to Olive to confirm actual spend matches planned budget, enabling finance to reconcile vendor invoices.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Capture spend confirmation from each platform (screenshot)",
                    "Upload to Olive at plan-line level",
                    "Finance matches against vendor invoices",
                    "Address discrepancies if flagged",
                    "Maintain audit trail for compliance"
                  ],
                  "inputs": [
                    "Platform access (for screenshots)",
                    "Olive plan line data",
                    "Vendor invoices (finance-side)"
                  ],
                  "outputs": [
                    "Financial confirmation (spend auditability)",
                    "Proof of delivery stored in system",
                    "Audit-ready documentation"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Campaign Management (Olive/CM 1.0)",
                        "Platforms (Screenshots)",
                        "Emails"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "Offline POD Request Automation agent",
                        "IDEA: Audit Agent"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Campaign Management 2.0 (Screenshot QA)",
                        "Campaign Performance"
                      ],
                      "agents": [
                        "Screenshot QA agent"
                      ]
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "From Observation to Prescription",
                  "description": "Weekly commentary currently describes what happened but cannot quantify what to do about it. Teams lack simulation or impact-scoring capability to compare optimization options. Opportunity identified to evolve in-flight reporting from observational narrative to grounded recommendations — connecting commentary to measurable trade-offs rather than relying on qualitative judgment alone."
                },
                {
                  "title": "Consolidated Data Visibility",
                  "description": "Data integrity is currently monitored across 4+ separate dashboards (Data Integrity Dashboard, Digital MM Dashboard, Misaligned Spend Dashboard, Campaign Performance), with no unified view and no clear remediation guidance. Opportunity identified to consolidate into a single alerting layer with explicit action instructions per alert type, reducing the knowledge gap where teams don't know what they're supposed to do or why it matters."
                },
                {
                  "title": "Accountability Infrastructure for Data Compliance",
                  "description": "Weekly MFG App maintenance runs at approximately 0% compliance; uploads are missed 30% of the time. The analytics team is nominally accountable but behavior change is needed across all disciplines (Planning, Activation, Analytics). Opportunity identified to pair a governance model (OKRs, escalation paths) with a knowledge layer (\"WTF Agent\") that makes the right action obvious at point of need — addressing both the structural \"don't know how\" and the behavioral \"don't know I should."
                },
                {
                  "title": "Automated Financial Proof of Delivery",
                  "description": "Platform screenshots are captured manually for audit compliance. When audits occur, old issues surface that weren't validated at time of upload,  creating retrospective risk disproportionate to the low effort required. Opportunity identified to automate proof-of-delivery requests to vendors and introduce validation at point of capture (screenshot QA) — catching discrepancies in real-time rather than discovering them 12 months later during audit."
                },
                {
                  "title": "Bypassed Central Infrastructure",
                  "description": "Teams routinely pull platform data directly, bypassing central dashboards, because they don't trust the completeness of centralized reporting. This creates duplicated effort and fragmented truth across PAs. Opportunity identified to make central data demonstrably reliable, establishing trust through visible integrity metrics such that platform-direct pulls become the exception for deep-dives rather than the default for routine reporting. Shared Opportunities (Google + MFG)"
                },
                {
                  "title": "VP Scorecard Data Confidence",
                  "description": "The VP scorecard is the most senior-visible deliverable in the partnership, yet it depends on the same data integrity layer that currently has structural gaps (missing API connections representing ~$450M in spend) and behavioral gaps (missed uploads). Neither side benefits when scorecard accuracy requires manual heroics or last-minute corrections. Opportunity identified to jointly define a minimum data completeness threshold for scorecard publication — with shared visibility into where gaps exist and a prioritized pipe-building plan to close them."
                },
                {
                  "title": "Data Accessibility for Shared Deliverables",
                  "description": "MLMO (Google's team) is the primary downstream consumer of MFG's data infrastructure. They need complete, accurate campaign data for their own internal deliverables and decision-making. When data is incomplete or late, both sides experience friction: MFG fields urgent requests and MLMO works with partial information. Opportunity identified to establish shared service-level expectations for data availability — making completeness measurable and visible to both parties rather than discovered ad-hoc when a report doesn't add up."
                },
                {
                  "title": "API Gap Prioritization",
                  "description": "10% of platforms used have no API available, and a further 10% of available APIs remain unimplemented. The combined effect: meaningful campaign spend is invisible to centralized systems, impacting reporting, optimization recommendations, and scorecard accuracy. Opportunity identified to jointly prioritize which platform connections unlock the most downstream value , aligning MFG's integration roadmap with Google's reporting and measurement priorities so that investment goes where it creates the most shared benefit."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Buttery Dashboard",
              "MFG App",
              "Creative Optimisation",
              "Media Optimisations",
              "Campaign Performance",
              "DataLab / EMDP",
              "MMM Dashboard",
              "Data Integrity Dashboard",
              "Digital MM Dashboard",
              "Misaligned Spend Dashboard",
              "MAT (Media Accountability Tool)",
              "AIQ Dashboard",
              "CLS Dashboard",
              "MMT Dashboard",
              "Incrementality Report",
              "Brand Report",
              "Goldfoil",
              "BP Scorecard",
              "HBR Assistant - Story Finder"
            ],
            "valueCreation": []
          }
        },
        {
          "id": "end-report",
          "title": "End-report",
          "summary": "This group represents the final stage of the campaign lifecycle: evaluating what happened, understanding why, and translating findings into actions that improve the next cycle. It spans individual test wrap-ups (potentially 15+ per campaign), brand-focused post-campaign analysis (PCA), and DR-focused half-yearly business reviews (HBR). Collectively, these jobs turn raw measurement data into strategic narratives — deriving core learnings, stress-testing hypotheses, contextualizing against competitive activity, and producing the decks and action lists that feed directly back into Long-Range Planning. The quality of this work determines whether MFG's campaigns compound in performance year over year, or simply repeat.",
          "milestone": "This group represents the final stage of the campaign lifecycle: evaluating what happened, understanding why, and translating findings into actions that improve the next cycle. It spans individual test wrap-ups (potentially 15+ per campaign), brand-focused post-campaign analysis (PCA), and DR-focused half-yearly business reviews (HBR). Collectively, these jobs turn raw measurement data into strategic narratives — deriving core learnings, stress-testing hypotheses, contextualizing against competitive activity, and producing the decks and action lists that feed directly back into Long-Range Planning. The quality of this work determines whether MFG's campaigns compound in performance year over year, or simply repeat.",
          "lanes": {
            "jtbd": [
              {
                "id": "jtbd-4-5",
                "number": "4.5",
                "title": "Testing Wrap-Up Slides",
                "summary": "As individual tests conclude (potentially multiple per campaign), produce wrap-up analysis with results, implications, and action recommendations. These feed both immediate optimization and long-term planning.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Gather test results from measurement partners",
                    "Create test report (results + implications)",
                    "Update CAP document",
                    "Determine action: push to BAU, stop, optimize, or retest",
                    "Create performance data link (by channel)",
                    "Share with relevant stakeholders (Media Lab, MLMO)"
                  ],
                  "inputs": [
                    "GLA test results (global hypothesis)",
                    "PMM test results (product hypothesis)",
                    "Campaign test results from partners",
                    "CAP test design documentation",
                    "Test Wrap Template (Slide)"
                  ],
                  "outputs": [
                    "Testing wrap-up slides (per test — potentially 15 per campaign)",
                    "Updated Buttery dashboard",
                    "PMM-specific view",
                    "Action decision: BAU / stop / optimize / retest",
                    "GLA Learnings Deck"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "3rd party Platform tools",
                        "CLS Dashboard (Conversion Lift Studies)",
                        "MMT Dashboard (Mix Testing)"
                      ],
                      "agents": []
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "IDEA: Sanitize Slides for Testing Wrap Up"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Campaign Performance"
                      ],
                      "agents": [
                        "IDEA: Agent to auto-build wrap-up slides from data + template"
                      ]
                    }
                  }
                }
              },
              {
                "id": "jtbd-4-6",
                "number": "4.6",
                "title": "PCA Deck (Perception Metrics)",
                "summary": "Post-campaign analysis for brand campaigns. Derive 3 core learnings, contextualize with competitive data, stress-test against hypotheses, and produce the narrative that informs next year's planning.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Pull campaign delivery data from data lake",
                    "Derive 3 core learnings (MLMO + Activation + Planning + Analytics)",
                    "Compare with competitive data for context",
                    "Stress-test hypotheses (what failed and why)",
                    "Pre-PCA Trix: Iterative alignment with stakeholders on story selection",
                    "Produce PCA deck",
                    "Conduct follow-up conversations with client"
                  ],
                  "inputs": [
                    "Measurement results (BLS, CLS)",
                    "Strategic/tactical planning data",
                    "Data link (brand)",
                    "Competitive data",
                    "Pre-PCA Trix (idea pool)"
                  ],
                  "outputs": [
                    "PCA deck (3 key learnings)",
                    "Follow-up conversations and captured learnings",
                    "Input to next year's Long-Range Planning",
                    "Optional: Quarterly-to-annual view aggregation"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [
                        "Knowledge base (historical learnings)",
                        "Platform",
                        "DataLab",
                        "MMM Dashboards",
                        "BLS Reports"
                      ],
                      "agents": [
                        "Orchestration Agent",
                        "Operational Facilitation Agent",
                        "HBR Assistant — Story Finder"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "PCA template draft producer agent",
                        "IDEA: Client perspective agent",
                        "IDEA: PCA process facilitation agent"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Campaign Performance"
                      ],
                      "agents": []
                    }
                  }
                }
              },
              {
                "id": "jtbd-4-7",
                "number": "4.7",
                "title": "HBR Deck (DR - Business Outcomes)",
                "summary": "Half-yearly business review for DR campaigns. Comprehensive performance analysis, anomaly deep-dives, strategic narrative, and action planning for next period. The most analytically intensive regular deliverable.",
                "status": "Sample complete",
                "owner": "",
                "effort": "",
                "sections": {
                  "coreActivities": [
                    "Gather campaign data from data lake (back-end collation + cleaning)",
                    "Identify performance anomalies + deep-dive \"why\"",
                    "External + internal research to explain trends",
                    "Check previous HBR action items against current performance",
                    "Determine high-value key stories (situation, complication, resolution)",
                    "Determine actions (do now vs. do later)",
                    "Visualize in deck",
                    "Story alignment: iterative, political process across stakeholders"
                  ],
                  "inputs": [
                    "Raw weekly reporting data (front + back-end)",
                    "Measurement results + CAP test results",
                    "Creative impact performance",
                    "Optimization logs",
                    "Google Trends; 3rd party data; competitive tools",
                    "Previous HBR; template; client priorities",
                    "GLA/PMM test learnings"
                  ],
                  "outputs": [
                    "HBR regional deck: key actions, forecasting assumptions, executive summary",
                    "HBR global deck (aggregated version)",
                    "Action list for next half-year planning",
                    "Input to Long-Range Planning"
                  ],
                  "enablers": {
                    "now": {
                      "tools": [],
                      "agents": [
                        "HBR Narrative Builder",
                        "Commentary Partner",
                        "HBR Assistant — Story Finder"
                      ]
                    },
                    "near": {
                      "tools": [],
                      "agents": [
                        "HBR Deck Builder agent"
                      ]
                    },
                    "next": {
                      "tools": [
                        "Campaign Performance"
                      ],
                      "agents": []
                    }
                  }
                }
              }
            ],
            "opportunities": {
              "mfgFocus": [
                {
                  "title": "From Assembly to Analysis",
                  "description": "Analysts currently spend the majority of their time on back-end data collation, cleaning, and deck formatting across PCA and HBR production. Opportunity identified to accelerate the mechanical assembly (data pull, template population, visualization) so that analytical capacity is redirected toward the strategic \"why\" — anomaly explanation, hypothesis stress-testing, and action recommendation."
                },
                {
                  "title": "Test Wrap-Up Velocity at Scale",
                  "description": "With 15+ tests concluding per campaign and data stored inconsistently across Trix tabs (incorrect links, skipped cells, inconsistent indexing), wrap-ups pile up and learnings become actionable too late to influence in-flight decisions. Opportunity identified to standardize test data capture and automate slide generation from structured results — compressing the cycle from test conclusion to actionable recommendation."
                },
                {
                  "title": "Strategic Traceability",
                  "description": "HBR and PCA narratives currently cannot trace a direct line from the original comms plan decision (\"we chose X because of Y\") through to media plan execution and outcome. Opportunity identified to build explicit strategic pull-through — connecting the rationale documented during planning to the results observed post-campaign — making the \"why it worked/didn't\" question answerable rather than speculative."
                },
                {
                  "title": "Persistent Learning Infrastructure",
                  "description": "MFG App should serve as the single source of truth for campaign results but currently offers only a quarterly view with no annual aggregation. Opportunity identified to evolve from fragmented per-campaign capture (decks, Trix, dashboards) toward a queryable learning layer — enabling pattern detection across campaigns, PAs, and time periods without relying on human memory. Shared Opportunities (Google + MFG)"
                },
                {
                  "title": "Closing the Learning Loop Timing Gap",
                  "description": "PCA and HBR learnings frequently arrive after the next campaign's planning has already locked. Neither side gets full value from the evaluation investment if learnings can't influence what happens next. Opportunity identified to align the evaluation delivery cadence with the planning intake cadence, so that the 3 key learnings from Q1 are structurally available as input to Q2/Q3 planning, rather than arriving as retrospective commentary."
                },
                {
                  "title": "Story Alignment Efficiency",
                  "description": "Both PCA and HBR involve an iterative, multi-stakeholder alignment process on which stories to tell — between MFG teams (Planning, Activation, Analytics) and Google stakeholders (Media Lab, MLMO, PMMs). This process is currently subjective and political, adding weeks to delivery. Opportunity identified to establish shared pre-alignment criteria (e.g., minimum data thresholds for a story to qualify, agreed hierarchy of story types) — reducing iteration cycles while preserving narrative quality."
                },
                {
                  "title": "Access to Measurement Model Outputs",
                  "description": "HBR narratives currently lack access to MMM (Media Mix Model) results, limiting the ability to ground budget reallocation recommendations in econometric evidence. Opportunity identified to define a shared protocol for MMM output access — clarifying what data MFG can reference, at what cadence, and in what format — so that HBR recommendations connect to the same models Google uses internally for budget decisions."
                }
              ]
            },
            "enabledBy": [],
            "enablers": [
              "Buttery Dashboard",
              "MFG App",
              "Creative Optimisation",
              "Media Optimisations",
              "Campaign Performance",
              "DataLab / EMDP",
              "MMM Dashboard",
              "Data Integrity Dashboard",
              "Digital MM Dashboard",
              "Misaligned Spend Dashboard",
              "MAT (Media Accountability Tool)",
              "AIQ Dashboard",
              "CLS Dashboard",
              "MMT Dashboard",
              "Incrementality Report",
              "Brand Report",
              "Goldfoil",
              "BP Scorecard",
              "HBR Assistant - Story Finder"
            ],
            "valueCreation": []
          }
        }
      ],
      "icon": "An"
    }
  ]
};

const valueTreeData = {
  "phases": [
    {
      "id": "discover",
      "title": "Discover",
      "accent": "#4285f4",
      "dimensions": [
        {
          "name": "Effectiveness",
          "definition": "Sharpen strategic hypotheses and strengthen recommendation quality by proactively surfacing historical learnings against benchmarks.",
          "opportunities": [
            {
              "id": "vt-discover-effectiveness-1",
              "title": "Automated Historical Learnings Synthesis",
              "shared": false,
              "enablers": [
                "#04.17 Goldfoil"
              ],
              "kpis": [
                "% campaigns with learnings at inception",
                "Repeat-mistake ↓%"
              ]
            },
            {
              "id": "vt-discover-effectiveness-2",
              "title": "Growth Opportunity Surfacing",
              "shared": false,
              "enablers": [
                "#01.16 Strategy Weaver (Agent)"
              ],
              "kpis": [
                "Hypotheses/qtr",
                "Acceptance %",
                "Performance lift %"
              ]
            },
            {
              "id": "vt-discover-effectiveness-3",
              "title": "Dynamic Product Insights Access",
              "shared": true,
              "enablers": [
                "#01.02 Audience Insights"
              ],
              "kpis": [
                "% plans with product context overlaid",
                "Relevance score Δ"
              ]
            }
          ]
        },
        {
          "name": "Execution",
          "definition": "Scale institutional knowledge across 1,500+ people and markets, enabling self-serve access without dependency on individual handoffs.",
          "opportunities": [
            {
              "id": "vt-discover-execution-1",
              "title": "Cross-PA Knowledge Sharing at Scale",
              "shared": false,
              "enablers": [
                "#01.17 SLA & Blueprint Navigator (Agent)"
              ],
              "kpis": [
                "Monthly active users",
                "Self-serve resolution %"
              ]
            }
          ]
        },
        {
          "name": "Efficiency",
          "definition": "Reduce manual data assembly and accelerate insight generation by unifying fragmented sources into a persistent intelligence layer.",
          "opportunities": [
            {
              "id": "vt-discover-efficiency-1",
              "title": "Connected Research Infrastructure",
              "shared": false,
              "enablers": [
                "#01.01 Strategic Insights",
                "#01.07 Charm"
              ],
              "kpis": [
                "Assembly productivity ↑%",
                "Sources unified into single layer"
              ]
            },
            {
              "id": "vt-discover-efficiency-2",
              "title": "Automated Strategy-to-Production Handoff",
              "shared": false,
              "enablers": [
                "#01.02 Audience Insights",
                "#02.02 Campaign Tactics"
              ],
              "kpis": [
                "Days strategy→brief",
                "Manual steps eliminated"
              ]
            },
            {
              "id": "vt-discover-efficiency-3",
              "title": "Live Scenario Planning Capability",
              "shared": false,
              "enablers": [
                "#02.01 Campaign Strategies"
              ],
              "kpis": [
                "Modelling responsiveness ↑",
                "Scenarios per cycle ↑"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "create",
      "title": "Create",
      "accent": "#ea4335",
      "dimensions": [
        {
          "name": "Execution",
          "definition": "Enable agencies and teams to self-serve on best practices and standards, reducing dependency on repeated manual education.",
          "opportunities": [
            {
              "id": "vt-create-execution-1",
              "title": "Standardized Asset Tracker Across Product Areas",
              "shared": false,
              "enablers": [
                "#02.08 Google Sheets (Asset Tracker)"
              ],
              "kpis": [
                "PAs on unified format %",
                "Spec error rate ↓%"
              ]
            }
          ]
        },
        {
          "name": "Efficiency",
          "definition": "Eliminate manual re-keying in plan assembly and compress planning timelines through automated data unification and linked documents.",
          "opportunities": [
            {
              "id": "vt-create-efficiency-1",
              "title": "Automated Tactical Data Assembly",
              "shared": false,
              "enablers": [
                "#02.01 Campaign Tactics"
              ],
              "kpis": [
                "Manual re-keys eliminated"
              ]
            },
            {
              "id": "vt-create-efficiency-2",
              "title": "Linked Scenario Plan and CAP",
              "shared": false,
              "enablers": [
                "#04.01 Buttery Dashboard"
              ],
              "kpis": [
                "Sync productivity ↑%",
                "Update propagation responsiveness ↑"
              ]
            },
            {
              "id": "vt-create-efficiency-3",
              "title": "Digital Best Practices Self-Service",
              "shared": false,
              "enablers": [
                "#01.17 SLA & Blueprint Navigator (Agent)"
              ],
              "kpis": [
                "Self-serve resolution %",
                "Briefing productivity ↑"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "activate",
      "title": "Activate",
      "accent": "#34a853",
      "dimensions": [
        {
          "name": "Effectiveness",
          "definition": "Raise QA coverage and improve launch quality through systematic governance, ensuring measurement alignment before builds begin.",
          "opportunities": [
            {
              "id": "vt-activate-effectiveness-1",
              "title": "Campaign Governance as the QA Backbone",
              "shared": false,
              "enablers": [
                "#03.01 Campaign Governance"
              ],
              "kpis": [
                "% campaigns through CG",
                "QA coverage %"
              ]
            }
          ]
        },
        {
          "name": "Execution",
          "definition": "Create a consistent, scalable monitoring standard across PAs by consolidating ~60 dashboards into one unified platform.",
          "opportunities": [
            {
              "id": "vt-activate-execution-1",
              "title": "Measurement & Test Alignment at Setup",
              "shared": true,
              "enablers": [
                "#04.02 MFG App"
              ],
              "kpis": [
                "% locked at scenario approval",
                "Delay days ↓"
              ]
            },
            {
              "id": "vt-activate-execution-2",
              "title": "Consolidated Monitoring (~60 to 1)",
              "shared": false,
              "enablers": [
                "#04.05 Campaign Performance"
              ],
              "kpis": [
                "Dashboards consolidated",
                "% reporting via OMS"
              ]
            }
          ]
        },
        {
          "name": "Efficiency",
          "definition": "Reduce rework and accelerate pre-launch validation by catching defects earlier before they cascade across vendor platforms.",
          "opportunities": [
            {
              "id": "vt-activate-efficiency-1",
              "title": "Reducing Rework from Upstream Quality",
              "shared": false,
              "enablers": [
                "#03.01 Campaign Governance",
                "#03.03 Creative Analytics"
              ],
              "kpis": [
                "Defects caught at trafficking stage %",
                "Rework ↓"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "analyse",
      "title": "Analyze",
      "accent": "#f9ab00",
      "dimensions": [
        {
          "name": "Execution",
          "definition": "Improve stakeholder confidence through governance OKRs, escalation paths, and a knowledge layer that makes the right action obvious.",
          "opportunities": [
            {
              "id": "vt-analyse-execution-1",
              "title": "Accountability Infrastructure for Data Compliance",
              "shared": false,
              "enablers": [
                "#05.05 Campaign Mgmt (Olive) Helper (Agent)"
              ],
              "kpis": [
                "% reporting via central platform",
                "Data trust score %"
              ]
            }
          ]
        },
        {
          "name": "Effectiveness",
          "definition": "Establish trust in central data through visible integrity metrics, making platform-direct pulls the exception rather than the default.",
          "opportunities": [
            {
              "id": "vt-analyse-effectiveness-1",
              "title": "Consolidate Data Visibility",
              "shared": false,
              "enablers": [
                "#04.08 Data Integrity"
              ],
              "kpis": [
                "Dashboards consolidated",
                "Remediation responsiveness ↑"
              ]
            },
            {
              "id": "vt-analyse-effectiveness-2",
              "title": "Bypassed Central Infrastructure",
              "shared": false,
              "enablers": [
                "#04.06 DataLab / EMDP"
              ],
              "kpis": [
                "Compliance OKR attainment %",
                "Stakeholder confidence score"
              ]
            }
          ]
        }
      ]
    }
  ]
};

const timelineEnablers = [
  {
    "id": "en-1",
    "title": "Strategic Insights",
    "description": "Competitive intelligence, market research, and strategic signals for planning",
    "type": "tool",
    "owner": "OMS",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-2",
    "title": "Audience Insights",
    "description": "Audience analysis, sizing, and data for planning and targeting decisions",
    "type": "tool",
    "owner": "OMS",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-3",
    "title": "NMI (Nielsen Media Impact)",
    "description": "Cross-platform reach/frequency planning and audience composition analysis (US only)",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-4",
    "title": "BAV (Brand Asset Valuator)",
    "description": "Brand health and perception tracking",
    "type": "tool",
    "owner": "WPP",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-5",
    "title": "GWI",
    "description": "Audience research and consumer insights",
    "type": "tool",
    "owner": "-",
    "span": "Discover, Create",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-6",
    "title": "Pathmatics",
    "description": "Competitive spend and share of voice tracking",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-7",
    "title": "Charm",
    "description": "Competitive data harmonizer — normalizes competitive data across sources",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-8",
    "title": "Sightly / Culture Replay",
    "description": "Cultural trend monitoring and social conversation analysis",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-9",
    "title": "Comscore",
    "description": "Digital audience measurement and media analytics",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-10",
    "title": "eMarketer",
    "description": "Industry research and market forecasting",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-11",
    "title": "Forrester",
    "description": "Thought leadership and category research",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-12",
    "title": "OBP / OBP Lite",
    "description": "Outcomes Based Planning — budget and channel allocation recommendations",
    "type": "tool",
    "owner": "Google",
    "span": "Discover, Analyze",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-13",
    "title": "SEMRush",
    "description": "SEO, competitor search traffic, and keyword opportunity research",
    "type": "tool",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-14",
    "title": "Google Trends",
    "description": "Search trend data for contextual and competitive analysis",
    "type": "tool",
    "owner": "Google",
    "span": "Discover, Analyze",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-15",
    "title": "Brand Brief Buster",
    "description": "Unpacks and interprets brand briefs",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-16",
    "title": "Strategy Weaver",
    "description": "Orchestrates specialized sub-agents and weaves outputs into unified strategic reports",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-17",
    "title": "SLA & Blueprint Navigator",
    "description": "Identifies campaign tiers and pulls relevant service level agreements or operational rules",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-18",
    "title": "SWOT Analysis",
    "description": "Applies structured SWOT framework to research findings",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-19",
    "title": "Comms Strategy GPS",
    "description": "Provides strategic reference points and pattern-matching for comms framework development",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-20",
    "title": "Baby Strategist",
    "description": "Extracts raw product features to generate brief utilizing GET/TO/BY frameworks",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-21",
    "title": "DR: Unpack the Brief",
    "description": "Uncovers critical, performance-focused variables from dense DR documentation",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-22",
    "title": "Strat Sprint Showrunner",
    "description": "Ingests disparate marketing metrics and structures them into session agendas",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-23",
    "title": "Audience Personas",
    "description": "Generates detailed, structured audience personas for any business or market",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-24",
    "title": "Brief Responder",
    "description": "Parses documents to analyze timelines, spend limits, and auto-generates discussion questions",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-25",
    "title": "Strategic Signals",
    "description": "Passes real-time social streams through filters to extract actionable trends",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-26",
    "title": "Behavioral Science",
    "description": "Scripts psychological formulas, habit-stacking models, and behavioral change tactics",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-27",
    "title": "Brand Analytics",
    "description": "Parses competitor layouts and long-term brand equity vectors over historic timelines",
    "type": "agent",
    "owner": "MFG",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-28",
    "title": "Synthetic Focus Groups",
    "description": "Simulates demographic audience responses to creative concepts and messaging",
    "type": "agent",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-29",
    "title": "How Might We",
    "description": "Generates structured HMW statements from briefs to drive brainstorming",
    "type": "agent",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-30",
    "title": "Creative Director",
    "description": "Evaluates concept alignments and pushes creative refinement signals",
    "type": "agent",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-31",
    "title": "Planner",
    "description": "Facilitates early audience strategy definition and market alignments",
    "type": "agent",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-32",
    "title": "Market Specifics",
    "description": "Extracts regional regulations, localized media trends, and cultural variables",
    "type": "agent",
    "owner": "-",
    "span": "Discover Only",
    "phaseId": "discover",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-33",
    "title": "Campaign Strategies",
    "description": "Channel-level budget allocation and reach/frequency planning",
    "type": "tool",
    "owner": "OMS",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-34",
    "title": "Campaign Tactics",
    "description": "Partner-level budget allocation, audience translation, and tactical planning per publisher",
    "type": "tool",
    "owner": "OMS",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-35",
    "title": "Campaign Management (OMS)",
    "description": "Media plan management — where plan of record lives in OMS",
    "type": "tool",
    "owner": "OMS",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-36",
    "title": "Campaign Management (Olive / CM 1.0)",
    "description": "PO approval, placement name generation, IO storage, financial tracking. In code freeze.",
    "type": "tool",
    "owner": "OMS",
    "span": "Create, Activate",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-37",
    "title": "Media Ocean",
    "description": "Offline media line submission and finance system",
    "type": "tool",
    "owner": "-",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-38",
    "title": "Google Sheets (Media Plan Trix)",
    "description": "Current source of truth for media plan — partner, channel, tactic, budget, flighting",
    "type": "tool",
    "owner": "-",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-39",
    "title": "Google Sheets (Financial Trix)",
    "description": "Financial tracking, commission and fee summary",
    "type": "tool",
    "owner": "-",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-40",
    "title": "Google Sheets (Asset Tracker)",
    "description": "Creative specifications, delivery tracking, format requirements per partner",
    "type": "tool",
    "owner": "-",
    "span": "Create, Activate",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-41",
    "title": "Testing Toolkit",
    "description": "Testing template that helps categorize tests, sample size calculators, and QA lists",
    "type": "tool",
    "owner": "-",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-42",
    "title": "Codex",
    "description": "AI-powered creative testing",
    "type": "tool",
    "owner": "Google",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-43",
    "title": "RFP Process Companion",
    "description": "Guides publisher response windows by providing template structures and step-by-step logic",
    "type": "agent",
    "owner": "MFG",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-44",
    "title": "DR: Brief to Activation Packet",
    "description": "Translates programmatic brief items into explicit bidding configurations and structures",
    "type": "agent",
    "owner": "MFG",
    "span": "Create Only",
    "phaseId": "create",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-45",
    "title": "Campaign Governance",
    "description": "Automated campaign setup QA and best practice verification",
    "type": "tool",
    "owner": "OMS",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-46",
    "title": "Production Studio",
    "description": "Asset production and creative asset management",
    "type": "tool",
    "owner": "OMS",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-47",
    "title": "Creative Analytics",
    "description": "Asset evaluation — QA creative against platform best practices and performance scoring",
    "type": "tool",
    "owner": "OMS",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-48",
    "title": "CM360",
    "description": "Ad server — tag creation, creative trafficking, 3rd party ad serving",
    "type": "tool",
    "owner": "Google",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-49",
    "title": "Wrike",
    "description": "Ticketing system for Ad Ops requests and project management",
    "type": "tool",
    "owner": "-",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-50",
    "title": "Placement Builder",
    "description": "Placement naming convention generation",
    "type": "tool",
    "owner": "-",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-51",
    "title": "3PS Form",
    "description": "3PAS (3rd party ad serving) initiation form",
    "type": "tool",
    "owner": "-",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-52",
    "title": "DV360",
    "description": "Programmatic buying platform",
    "type": "tool",
    "owner": "Google",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-53",
    "title": "Google Ads",
    "description": "Search, YouTube, and Performance Max campaign management",
    "type": "tool",
    "owner": "Google",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-54",
    "title": "Meta Ads Manager",
    "description": "Social campaign management (Meta properties)",
    "type": "tool",
    "owner": "Meta",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-55",
    "title": "SEMantha",
    "description": "Yields answers to paid search implementation, troubleshooting, and copy layout rules",
    "type": "agent",
    "owner": "MFG",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-56",
    "title": "Victor the Scriptor",
    "description": "Converts natural language commands into API script files for Google Ads/Workspace",
    "type": "agent",
    "owner": "MFG",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-57",
    "title": "Prog-Fessor",
    "description": "Synthesizes complex programmatic setup, audience rules, and target inventory configs",
    "type": "agent",
    "owner": "MFG",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-58",
    "title": "Eve Aluator",
    "description": "Audits API scripts against standard compliance check-sheets and rigid PII avoidance rules",
    "type": "agent",
    "owner": "MFG",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-59",
    "title": "Custom Intent Targeting Expert",
    "description": "Converts target descriptions into downloadable intent keyword groups and URL clouds",
    "type": "agent",
    "owner": "MFG",
    "span": "Activate Only",
    "phaseId": "activate",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-60",
    "title": "Buttery Dashboard",
    "description": "Consolidated CAP (test plan) view — tracks test status across campaigns",
    "type": "tool",
    "owner": "-",
    "span": "Create, Analyze",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-61",
    "title": "MFG App",
    "description": "Measurement plans, metric QA, campaign lock, VP scorecard data feed, MMM uploads",
    "type": "tool",
    "owner": "-",
    "span": "Create, Analyze",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-62",
    "title": "Creative Optimisation",
    "description": "Trafficking and optimisation — creative rotation, social ad building, tracker generation",
    "type": "tool",
    "owner": "OMS",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-63",
    "title": "Media Optimisations",
    "description": "Cross platform budget optimisation tool within OMS",
    "type": "tool",
    "owner": "OMS",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-64",
    "title": "Campaign Performance",
    "description": "Centralised campaign performance data and media reporting",
    "type": "tool",
    "owner": "OMS",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-65",
    "title": "DataLab / EMDP",
    "description": "Data lake — backend data storage, BigQuery access, custom reporting",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-66",
    "title": "MMM Dashboard",
    "description": "Primary client-facing campaign performance dashboard for weekly reporting",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-67",
    "title": "Data Integrity Dashboard",
    "description": "Flags missing uploads, mapping errors, and data gaps",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-68",
    "title": "Digital MM Dashboard",
    "description": "Digital media performance review modules (requires consolidation strategy with 4.07)",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-69",
    "title": "Misaligned Spend Dashboard",
    "description": "Identifies discrepancies between planned and reported spend",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-70",
    "title": "MAT (Media Accountability Tool)",
    "description": "Campaign health flags and pacing alerts",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-71",
    "title": "AIQ Dashboard",
    "description": "Platform best practice adoption scoring",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-72",
    "title": "CLS Dashboard",
    "description": "Conversion Lift Study results and health monitoring",
    "type": "tool",
    "owner": "Google",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-73",
    "title": "MMT Dashboard",
    "description": "Match Market Test delivery monitoring and study health",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-74",
    "title": "Incrementality Report",
    "description": "Incremental performance reporting across channels",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-75",
    "title": "Brand Report",
    "description": "Brand lift study results and brand campaign performance",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-76",
    "title": "Goldfoil",
    "description": "CLS/BLS results aggregation and reporting",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-77",
    "title": "BP Scorecard",
    "description": "Best practice adherence scoring per campaign",
    "type": "tool",
    "owner": "-",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-78",
    "title": "HBR Assistant - Story Finder",
    "description": "Decodes raw campaign metrics into strategic narratives for QBRs",
    "type": "agent",
    "owner": "MFG",
    "span": "Analyze Only",
    "phaseId": "analyse",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-79",
    "title": "Weekly Wrap",
    "description": "Generates weekly campaign commentary and narrative points from dashboard outputs",
    "type": "agent",
    "owner": "MFG",
    "span": "All Phases",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-80",
    "title": "Deep Researcher",
    "description": "Executes multi-source data validation, deep data lookups, and discovery scans",
    "type": "agent",
    "owner": "MFG",
    "span": "All Phases",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-81",
    "title": "Ideas Explorer",
    "description": "Fosters brainstorming sessions using structural lateral thinking exercises",
    "type": "agent",
    "owner": "MFG",
    "span": "All Phases",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-82",
    "title": "Check & Challenge",
    "description": "Emulates highly critical client feedback to stress-test claims inside draft slides",
    "type": "agent",
    "owner": "MFG",
    "span": "All Phases",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-83",
    "title": "Campaign Mgmt (Olive) Helper",
    "description": "Generates immediate technical walkthroughs, form field guides, and troubleshooting answers",
    "type": "agent",
    "owner": "MFG",
    "span": "Create, Activate, Analyze",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  },
  {
    "id": "en-84",
    "title": "Analogies",
    "description": "Derives parallel structures from other industries to de-risk adoption of new media strategies",
    "type": "agent",
    "owner": "MFG",
    "span": "All Phases",
    "phaseId": "cross-phase",
    "subphaseId": "",
    "startDate": "",
    "endDate": ""
  }
];
