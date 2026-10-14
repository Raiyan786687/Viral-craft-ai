import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || 'All-in-One AI Growth Engine';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundColor: '#09090b',
                    padding: '60px',
                    fontFamily: 'sans-serif',
                    color: '#ffffff',
                    border: '4px solid #27272a',
                }}
            >
                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#38bdf8', letterSpacing: '2px' }}>
                    🚀 ALL-IN-ONE AI GROWTH ENGINE
                </div>
                <div style={{ fontSize: 48, fontWeight: 'bold', lineHeight: 1.3, color: '#f4f4f5' }}>
                    "{text}"
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#a1a1aa', fontSize: 18 }}>
                    <span>Rayyan Agentic Developer</span>
                    <span>viral-engine.ai</span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}