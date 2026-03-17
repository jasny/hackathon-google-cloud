import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080; // Standard dummy port

app.use(cors());
app.use(express.json());

// Mock database for sessions (A2UI state)
const sessions: Record<string, { a2ui: any[], step: number }> = {};

/**
 * Mocks Vertex AI Search and Conversation (Agents) detectIntent endpoint
 * Vertex AI uses a custom method syntax ':detectIntent' at the end of the URL.
 */
app.post('/v3/projects/:project/locations/:location/agents/:agent/sessions/:sessionId', (req, res) => {
  // Extract sessionId, handling the ':detectIntent' suffix if present
  const sessionId = req.params.sessionId.split(':')[0];
  const { queryInput, queryParams } = req.body;
  const text = queryInput?.text?.text || '';

  console.log(`[Dummy User Agent] Request for session ${sessionId}: "${text}"`);

  // Handle session end
  if (text === "END_SESSION") {
    console.log(`[Dummy User Agent] Ending session ${sessionId}`);
    delete sessions[sessionId];
    return res.json({ status: 'ended' });
  }

  // Initial request (usually from connect/hello)
  if (!sessions[sessionId]) {
    const capability = queryParams?.capability || 'hello';
    console.log(`[Dummy User Agent] Initializing session ${sessionId} for capability ${capability}`);
    
    const isPayment = capability === 'membership_application';

    sessions[sessionId] = {
      step: 1,
      a2ui: [
        {
          id: "root",
          type: "Container",
          children: ["header-1", "item-name", "item-demographics", "item-political-affiliation", "item-address"]
        },
        {
          id: "header-1",
          type: "SectionHeader",
          props: { text: "Data Request" }
        },
        {
          id: "item-name",
          type: "DataRequestItem",
          props: {
            label: "Name",
            description: "Necessary for personalizing communication and official registration in the database.",
            state: "on"
          }
        },
        {
          id: "item-demographics",
          type: "NestedDataRequestItem",
          props: {
            label: "Demographics",
            items: [
              { id: "age", label: "Age", checked: true },
              { id: "gender", label: "Gender", checked: true }
            ],
            footerText: "Used for statistical analysis and tailored content.",
            open: false
          }
        },
        {
          id: "item-political-affiliation",
          type: "DataRequestItem",
          props: {
            label: "Political Affiliation",
            description: "Sensitive data: Used to show targeted political advertisements and information.",
            state: "off",
            isUnknown: true
          }
        },
        {
          id: "item-address",
          type: "NestedDataRequestItem",
          props: {
            label: "Address",
            items: [
              { id: "city", label: "City", checked: true },
              { id: "streetName", label: "Street Name", checked: false }
            ],
            footerText: "Required for regional campaign texts and invitations to local meetings.",
            open: true
          }
        }
      ]
    };

    return res.json({
      queryResult: {
        responseMessages: [
          { text: { text: [isPayment ? "I've prepared your membership application. Please confirm the payment." : "Hello! I've prepared the data request based on your memory."] } }
        ],
        parameters: {
          a2ui: sessions[sessionId].a2ui,
          triggerPayment: isPayment
        }
      }
    });
  }

  // Handle chat/follow-up to fill in unknown data
  const session = sessions[sessionId];
  
  if (text.toLowerCase().includes('liberal') || text.toLowerCase().includes('democrat') || text.toLowerCase().includes('conservative')) {
    console.log(`[Dummy User Agent] Learning political affiliation for session ${sessionId}`);
    
    session.a2ui = session.a2ui.map(c => {
      if (c.id === "item-political-affiliation") {
        return { ...c, props: { ...c.props, isUnknown: false, state: "on" } };
      }
      return c;
    });

    return res.json({
      queryResult: {
        responseMessages: [
          { text: { text: ["Perfect! I've updated your preferences and the data request. You can now proceed with sharing."] } }
        ],
        parameters: {
          a2ui: session.a2ui,
          complete: true
        }
      }
    });
  }

  res.json({
    queryResult: {
      responseMessages: [
        { text: { text: ["Could you tell me a bit more about your political interests so I can complete the request?"] } }
      ]
    }
  });
});

app.listen(port, () => {
  console.log(`[Dummy User Agent] Server listening at http://localhost:${port}`);
});
